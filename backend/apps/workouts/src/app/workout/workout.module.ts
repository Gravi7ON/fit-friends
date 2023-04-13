import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { WorkoutRepository } from './workout.repository';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './workout.constant';
import { getRabbitMqWorkoutsQueueConfig } from '../../config/rabbitmq.config';

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
  ],
  providers: [WorkoutService, WorkoutRepository, JwtStrategy],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
