import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSubscriberController } from './workout-subscriber.controller';
import { WorkoutSubscriberService } from './workout-subscriber.service';
import { WorkoutSubscriberRepository } from './workout-subscriber.repository';
import { MailModule } from '../mail/mail.module';
import {
  WorkoutSubscriberModel,
  WorkoutSubscriberSchema,
} from './models/workout-subscriber.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqWorkoutsQueueConfig } from '../../config/rabbitmq.config';
import { RABBITMQ_SERVICE } from './workout.subscriber.constant';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqWorkoutsQueueConfig,
        inject: [ConfigService],
      },
    ]),
    MongooseModule.forFeature([
      { name: WorkoutSubscriberModel.name, schema: WorkoutSubscriberSchema },
    ]),
    MailModule,
  ],
  controllers: [WorkoutSubscriberController],
  providers: [
    WorkoutSubscriberService,
    WorkoutSubscriberRepository,
    JwtStrategy,
  ],
})
export class WorkoutSubscriberModule {}
