# FitFriends целиком в одном контейнере:
#   nginx (:80, единственный внешний порт) -> фронтенд + /api/* -> users / workouts / notify
#   MongoDB, PostgreSQL, RabbitMQ, Redis, Mailpit (SMTP) — только на 127.0.0.1
# Процессами управляет supervisord, данные лежат в томе /data.
#
#   docker build -t fitfriends .
#   docker run -d --name fitfriends -p 80:80 -v fitfriends-data:/data fitfriends
#
# Если Docker Hub недоступен, образы можно брать через зеркало:
#   docker build --build-arg DOCKER_REGISTRY=mirror.gcr.io -t fitfriends .

ARG DOCKER_REGISTRY=docker.io
ARG NODE_VERSION=22.23.2
ARG MAILPIT_VERSION=v1.31.4

# ---------------------------------------------------------------- node base
FROM ${DOCKER_REGISTRY}/library/node:${NODE_VERSION}-bookworm-slim AS node-base
ENV NX_DAEMON=false \
    NX_NO_CLOUD=true \
    CHECKPOINT_DISABLE=1 \
    CYPRESS_INSTALL_BINARY=0
# Тулчейн для нативных модулей (bcrypt, @parcel/watcher и др.), у которых нет
# готовых бинарников под текущую архитектуру (например, linux/arm64).
# В runtime-образ не попадает: оттуда копируется только бинарник node.
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------------------ backend
FROM node-base AS backend-build
WORKDIR /src/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY backend/ ./
RUN npx prisma generate --schema apps/workouts/prisma/schema.prisma \
 && npx nx run-many --target=build --projects=users,workouts,notify --parallel=1

# В рантайм уходят только prod-зависимости. Prisma CLI и ts-node (для миграций
# и сида) ставятся отдельно в /tools, версии совпадают с package-lock.json.
RUN npm prune --omit=dev --no-audit --no-fund \
 && mkdir /tools && cd /tools && npm init -y >/dev/null \
 && npm install --no-audit --no-fund \
      prisma@4.11.0 ts-node@10.9.1 typescript@4.9.5 tsconfig-paths@4.1.2 \
 && cd /src/backend \
 && /tools/node_modules/.bin/prisma generate --schema apps/workouts/prisma/schema.prisma

# ----------------------------------------------------------------- frontend
FROM node-base AS frontend-build
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npx vite build --outDir dist

# ------------------------------------------------------------------ mailpit
FROM ${DOCKER_REGISTRY}/axllent/mailpit:${MAILPIT_VERSION} AS mailpit

# ------------------------------------------------------------------ runtime
FROM ${DOCKER_REGISTRY}/library/ubuntu:24.04 AS runtime
ARG MONGODB_VERSION=8.0
ENV DEBIAN_FRONTEND=noninteractive \
    CHECKPOINT_DISABLE=1 \
    NODE_ENV=production

# policy-rc.d: postinst-скрипты пакетов не стартуют службы при сборке;
# createcluster.conf: не создавать кластер по умолчанию, свой — в /data/postgres.
RUN printf '#!/bin/sh\nexit 101\n' > /usr/sbin/policy-rc.d && chmod +x /usr/sbin/policy-rc.d \
 && mkdir -p /etc/postgresql-common \
 && echo 'create_main_cluster = false' > /etc/postgresql-common/createcluster.conf \
 && apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates curl gnupg openssl \
 && curl -fsSL "https://pgp.mongodb.com/server-${MONGODB_VERSION}.asc" \
      | gpg --dearmor -o /usr/share/keyrings/mongodb-server.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/mongodb-server.gpg] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/${MONGODB_VERSION} multiverse" \
      > /etc/apt/sources.list.d/mongodb-org.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      mongodb-org-server postgresql redis-server rabbitmq-server nginx supervisor \
 && apt-get purge -y gnupg && apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/* /etc/nginx/sites-enabled/* \
 && ln -s "$(ls -d /usr/lib/postgresql/*/ | head -n1)" /usr/lib/postgresql/current \
 && useradd --system --user-group --create-home --home-dir /home/app --shell /usr/sbin/nologin app

COPY --from=node-base /usr/local/bin/node /usr/local/bin/node
COPY --from=mailpit /mailpit /usr/local/bin/mailpit

WORKDIR /app
COPY --from=backend-build /tools /app/tools
COPY --from=backend-build /src/backend/node_modules /app/backend/node_modules
COPY --from=backend-build /src/backend/dist /app/backend/dist
COPY --from=backend-build /src/backend/libs /app/backend/libs
COPY --from=backend-build /src/backend/tsconfig.base.json /app/backend/tsconfig.base.json
COPY --from=backend-build /src/backend/apps/workouts/prisma /app/backend/apps/workouts/prisma
COPY --from=frontend-build /src/frontend/dist /app/www

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY --chmod=755 docker/entrypoint.sh docker/run-service.sh /app/docker/
COPY docker/mongo-init.js /app/docker/

# FileController в workouts отдаёт картинки из '../../../markup/...' относительно cwd
# (cwd = dist/apps/workouts), сами картинки лежат в собранной статике фронтенда.
RUN ln -s /app/www /app/backend/markup

VOLUME ["/data"]
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=120s --retries=3 \
  CMD supervisorctl status >/dev/null && curl -fsS -o /dev/null http://127.0.0.1/ || exit 1

STOPSIGNAL SIGTERM
ENTRYPOINT ["/app/docker/entrypoint.sh"]
