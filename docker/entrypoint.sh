#!/usr/bin/env bash
# Первичная инициализация хранилищ в /data, миграции и запуск supervisord.
# Секреты генерируются один раз и хранятся в /data/secrets/app.env (root:app, 0640).
# Значения секретов в лог не выводятся.
set -euo pipefail

DATA=/data
SECRETS_FILE="$DATA/secrets/app.env"
PG_BIN=/usr/lib/postgresql/current/bin
PG_DATA="$DATA/postgres"
MONGO_DATA="$DATA/mongo"
PRISMA_SCHEMA=/app/backend/apps/workouts/prisma/schema.prisma

log() { echo "[entrypoint] $*"; }
secret() { grep -m1 "^$1=" "$SECRETS_FILE" | cut -d= -f2-; }

# ------------------------------------------------------------------ secrets
mkdir -p "$DATA/secrets" "$DATA/mongo" "$DATA/postgres" "$DATA/redis" "$DATA/rabbitmq" "$DATA/mailpit"
(
  umask 077
  touch "$SECRETS_FILE"
  for key in JWT_AT_SECRET JWT_RT_SECRET MONGO_APP_PASSWORD POSTGRES_APP_PASSWORD RABBIT_APP_PASSWORD; do
    if ! grep -q "^${key}=" "$SECRETS_FILE"; then
      echo "${key}=$(openssl rand -hex 32)" >> "$SECRETS_FILE"
      log "сгенерирован секрет ${key}"
    fi
  done
)
chown root:app "$DATA/secrets" "$SECRETS_FILE"
chmod 750 "$DATA/secrets"
chmod 640 "$SECRETS_FILE"

chown -R mongodb:mongodb "$MONGO_DATA"
chown -R postgres:postgres "$PG_DATA" && chmod 700 "$PG_DATA"
chown -R redis:redis "$DATA/redis"
chown -R rabbitmq:rabbitmq "$DATA/rabbitmq"
chown -R app:app "$DATA/mailpit"
mkdir -p /var/run/postgresql && chown postgres:postgres /var/run/postgresql

# ----------------------------------------------------------------- rabbitmq
cat > /etc/rabbitmq/rabbitmq-env.conf <<EOF
NODENAME=rabbit@localhost
MNESIA_BASE=$DATA/rabbitmq/mnesia
LOG_BASE=$DATA/rabbitmq/log
EOF
(
  umask 027
  cat > /etc/rabbitmq/rabbitmq.conf <<EOF
listeners.tcp.default = 127.0.0.1:5672
distribution.listener.interface = 127.0.0.1
default_vhost = /
default_user = fitfriends
default_pass = $(secret RABBIT_APP_PASSWORD)
log.console = true
log.file = false
EOF
)
chown root:rabbitmq /etc/rabbitmq/rabbitmq.conf

# ------------------------------------------------------------------ mongodb
if [ ! -f "$MONGO_DATA/.fitfriends-initialized" ]; then
  log "инициализация MongoDB"
  runuser -u mongodb -- mongod --dbpath "$MONGO_DATA" --bind_ip 127.0.0.1 --port 27017 \
    --fork --logpath "$MONGO_DATA/init.log" >/dev/null
  MONGO_INIT_PASSWORD="$(secret MONGO_APP_PASSWORD)" NODE_PATH=/app/backend/node_modules \
    runuser -u app -- node /app/docker/mongo-init.js
  runuser -u mongodb -- mongod --dbpath "$MONGO_DATA" --shutdown >/dev/null
  touch "$MONGO_DATA/.fitfriends-initialized"
fi

# --------------------------------------------------------------- postgresql
if [ ! -s "$PG_DATA/PG_VERSION" ]; then
  log "инициализация PostgreSQL"
  runuser -u postgres -- "$PG_BIN/initdb" -D "$PG_DATA" -U postgres \
    --auth-local=peer --auth-host=scram-sha-256 -E UTF8 --locale=C.UTF-8 >/dev/null
fi

runuser -u postgres -- "$PG_BIN/pg_ctl" -D "$PG_DATA" -w -l "$PG_DATA/init.log" \
  -o "-c listen_addresses=127.0.0.1 -c unix_socket_directories=/var/run/postgresql" start >/dev/null

# Пароль передаётся через окружение и \getenv, а не через argv или текст SQL.
PG_APP_PASSWORD="$(secret POSTGRES_APP_PASSWORD)" runuser -u postgres -- \
  psql -X -q -v ON_ERROR_STOP=1 -h /var/run/postgresql -d postgres <<'SQL'
\getenv app_password PG_APP_PASSWORD
SELECT 'CREATE ROLE fitfriends LOGIN' WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'fitfriends')\gexec
ALTER ROLE fitfriends WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'app_password';
SELECT 'CREATE DATABASE "fitfriends-workouts" OWNER fitfriends' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'fitfriends-workouts')\gexec
SQL

export DATABASE_URL="postgresql://fitfriends:$(secret POSTGRES_APP_PASSWORD)@127.0.0.1:5432/fitfriends-workouts?schema=public"

log "применение миграций Prisma"
runuser -u app -- /app/tools/node_modules/.bin/prisma migrate deploy --schema "$PRISMA_SCHEMA"

if [ ! -f "$PG_DATA/.fitfriends-gyms-seeded" ]; then
  log "заполнение таблицы спортзалов"
  if (
    cd /app/backend/apps/workouts
    TS_NODE_PROJECT=/app/backend/apps/workouts/prisma/tsconfig.json \
    TS_NODE_TRANSPILE_ONLY=true \
    TS_NODE_COMPILER_OPTIONS='{"module":"CommonJS"}' \
      runuser -u app -- node \
        -r /app/tools/node_modules/ts-node/register \
        -r /app/tools/node_modules/tsconfig-paths/register \
        prisma/gym-seed.ts
  ); then
    touch "$PG_DATA/.fitfriends-gyms-seeded"
  else
    log "сид спортзалов не выполнен, повтор при следующем старте"
  fi
fi

unset DATABASE_URL
runuser -u postgres -- "$PG_BIN/pg_ctl" -D "$PG_DATA" -w -m fast stop >/dev/null

log "запуск сервисов"
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
