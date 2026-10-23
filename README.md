# :rocket: FitFriends

<img width="410" alt="Главная страница" src="https://user-images.githubusercontent.com/89462502/223781053-81c5438c-65d2-412e-92ff-5f9c1823ff26.png"> <img width="410" alt="ЛК тренера" src="https://user-images.githubusercontent.com/89462502/223781070-0d6f578e-22e1-4451-814b-867854467e4a.png"> <img width="410" alt="ЛК пользователя" src="https://user-images.githubusercontent.com/89462502/223781076-e2d4f1d4-4f85-4ed5-a106-b00f72ee24ce.png"> <img width="410" alt="Доступные тренировки" src="https://user-images.githubusercontent.com/89462502/223781082-842de1d4-1383-479b-9310-b51b6ac2345c.png">

___

Инструкции по работе с проектами находятся в файле **description.md** директорий ./backend и ./frontend соответсвенно.

## Запуск в одном контейнере

`Dockerfile` в корне собирает всё приложение в один образ: фронтенд, сервисы users / workouts / notify,
MongoDB, PostgreSQL, RabbitMQ, Redis и Mailpit (тестовый SMTP). Процессами управляет supervisord.
Снаружи доступен только порт 80 (nginx), базы и брокер слушают лишь 127.0.0.1 внутри контейнера.

```bash
docker compose up -d --build        # или:
docker build -t fitfriends .
docker run -d --name fitfriends -p 80:80 -v fitfriends-data:/data --stop-timeout 60 fitfriends
```

После старта приложение открывается по `http://<адрес-сервера>/`. Первый запуск занимает около минуты:
инициализируются базы, применяются миграции Prisma, заполняется таблица спортзалов.

- Данные и сгенерированные секреты (JWT, пароли внутренних БД) хранятся в томе `/data`,
  секреты — в `/data/secrets/app.env`. Без тома при пересоздании контейнера пропадут и данные, и сессии.
- Свои JWT-секреты или реальный SMTP можно передать переменными окружения (`-e` / `env_file`):
  `JWT_AT_SECRET`, `JWT_RT_SECRET`, `JWT_AT_EXPIRES_IN`, `JWT_RT_EXPIRES_IN`,
  `MAIL_SMTP_HOST`, `MAIL_SMTP_PORT`, `MAIL_USER_NAME`, `MAIL_USER_PASSWORD`, `MAIL_FROM`.
  Не коммитьте такие файлы: `*.env` уже в `.gitignore` и `.dockerignore`.
- Порт на хосте меняется через `FITFRIENDS_PORT=8080 docker compose up -d`.
- Если Docker Hub недоступен (таймаут на `registry-1.docker.io`), образы можно брать через зеркало:
  `DOCKER_REGISTRY=mirror.gcr.io docker compose up -d --build`.
- Для публичного доступа ставьте перед контейнером TLS-терминатор (Caddy, Traefik, nginx с certbot).
  Сам контейнер отдаёт только HTTP.
- Логи всех процессов: `docker logs -f fitfriends`, состояние: `docker exec fitfriends supervisorctl status`.
- Письма Mailpit (UI на 127.0.0.1:8025 внутри контейнера):
  `docker exec fitfriends curl -s http://127.0.0.1:8025/api/v1/messages`.
