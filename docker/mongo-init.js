// Создаёт пользователя приложения с минимальными правами (readWrite на две базы).
// Пароль берётся из окружения, в лог не пишется.
const { MongoClient } = require('mongodb');

const USER = 'fitfriends';
const ROLES = [
  { role: 'readWrite', db: 'fitfriends-users' },
  { role: 'readWrite', db: 'fitfriends-notify' },
];

async function main() {
  const pwd = process.env.MONGO_INIT_PASSWORD;
  if (!pwd) {
    throw new Error('MONGO_INIT_PASSWORD is not set');
  }

  const client = new MongoClient('mongodb://127.0.0.1:27017', {
    serverSelectionTimeoutMS: 30000,
  });
  await client.connect();

  try {
    const admin = client.db('admin');
    const { users } = await admin.command({ usersInfo: USER });
    if (users.length === 0) {
      await admin.command({ createUser: USER, pwd, roles: ROLES });
      console.log(`[mongo-init] user "${USER}" created`);
    } else {
      await admin.command({ updateUser: USER, pwd, roles: ROLES });
      console.log(`[mongo-init] user "${USER}" updated`);
    }
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error('[mongo-init] failed:', err.message);
  process.exit(1);
});
