import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtOptions } from '../config/jwt.config';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions],
      validate: validateEnvironments,
    }),
    WorkoutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
