import { ConfigService, registerAs } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitMqOptions = registerAs('rmq', () => ({
  user: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
  host: process.env.RABBIT_HOST,
  queueWorkouts: process.env.RABBIT_WORKOUTS_SERVICE_WORKOUTS_QUEUE,
}));

export function getRabbitMqWorkoutsQueueConfig(
  configService: ConfigService
): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>('rmq.queueWorkouts');
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  };
}
