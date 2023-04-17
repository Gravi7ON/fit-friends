import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { validateEnvironments } from './env.validation';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { WorkoutSubscriberModule } from './workout-subscriber/workout-subscriber.module';
import { mailOptions } from '../config/mail.config';
import { MailModule } from './mail/mail.module';
import { jwtOptions } from '../config/jwt.config';
import { redisOptions } from '../config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [
        rabbitMqOptions,
        mongoDbOptions,
        mailOptions,
        jwtOptions,
        redisOptions,
      ],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    WorkoutSubscriberModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
