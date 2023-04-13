import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtOptions } from '../config/jwt.config';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';
import { FileModule } from './file/file.module';
import { rabbitMqOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions, rabbitMqOptions],
      validate: validateEnvironments,
    }),
    WorkoutModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
