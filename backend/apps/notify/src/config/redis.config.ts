import { registerAs } from '@nestjs/config';

export const redisOptions = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
}));
