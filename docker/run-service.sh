#!/usr/bin/env bash
# Запуск NestJS-сервиса: собирает его окружение, ждёт зависимости, exec node.
# Переменные, переданные в контейнер (docker run -e / env_file), имеют приоритет
# над сгенерированными в /data/secrets/app.env.
set -euo pipefail

SERVICE="${1:?usage: run-service.sh users|workouts|notify}"
SECRETS_FILE=/data/secrets/app.env

while IFS='=' read -r key value; do
  [[ -z "$key" || "$key" == \#* ]] && continue
  [[ -n "${!key:-}" ]] || export "$key=$value"
done < "$SECRETS_FILE"

wait_for() {
  local name=$1 port=$2
  for _ in $(seq 1 120); do
    if (exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null; then
      return 0
    fi
    sleep 1
  done
  echo "[$SERVICE] $name (127.0.0.1:$port) недоступен" >&2
  exit 1
}

export JWT_AT_EXPIRES_IN="${JWT_AT_EXPIRES_IN:-15m}"

mongo_env() {
  export MONGO_DB=$1
  export MONGO_HOST=127.0.0.1
  export MONGO_PORT=27017
  export MONGO_USER=fitfriends
  export MONGO_PASSWORD="$MONGO_APP_PASSWORD"
  export MONGO_AUTH_BASE=admin
}

rabbit_env() {
  export RABBIT_USER=fitfriends
  export RABBIT_PASSWORD="$RABBIT_APP_PASSWORD"
  export RABBIT_HOST=127.0.0.1:5672
}

case "$SERVICE" in
  users)
    export PORT=3333 WORKOUTS_PORT=3334
    export JWT_RT_EXPIRES_IN="${JWT_RT_EXPIRES_IN:-7d}"
    mongo_env fitfriends-users
    wait_for mongodb 27017
    ;;
  workouts)
    export PORT=3334 USERS_PORT=3333
    export RABBIT_WORKOUTS_SERVICE_WORKOUTS_QUEUE=fitfriends.workouts
    export DATABASE_URL="postgresql://fitfriends:${POSTGRES_APP_PASSWORD}@127.0.0.1:5432/fitfriends-workouts?schema=public"
    rabbit_env
    wait_for postgres 5432
    wait_for rabbitmq 5672
    ;;
  notify)
    export PORT=3335
    export RABBIT_NOTIFY_SERVICE_WORKOUTS_QUEUE=fitfriends.workouts
    export REDIS_HOST=127.0.0.1 REDIS_PORT=6379
    # По умолчанию письма уходят во встроенный Mailpit; для реальной почты
    # передайте MAIL_* в контейнер.
    export MAIL_SMTP_HOST="${MAIL_SMTP_HOST:-127.0.0.1}"
    export MAIL_SMTP_PORT="${MAIL_SMTP_PORT:-1025}"
    export MAIL_USER_NAME="${MAIL_USER_NAME:-fitfriends}"
    export MAIL_USER_PASSWORD="${MAIL_USER_PASSWORD:-fitfriends}"
    export MAIL_FROM="${MAIL_FROM:-FitFriends <noreply@fitfriends.local>}"
    mongo_env fitfriends-notify
    rabbit_env
    wait_for mongodb 27017
    wait_for rabbitmq 5672
    wait_for redis 6379
    ;;
  *)
    echo "unknown service: $SERVICE" >&2
    exit 1
    ;;
esac

unset MONGO_APP_PASSWORD POSTGRES_APP_PASSWORD RABBIT_APP_PASSWORD
[[ "$SERVICE" == users ]] || unset JWT_RT_SECRET

cd "/app/backend/dist/apps/$SERVICE"
exec node main.js
