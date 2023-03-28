import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from '@backend/core';

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        authDatabase: configService.get<string>('database.authBase'),
        databaseName: configService.get<string>('database.databaseName'),
      }),
    }),
    inject: [ConfigService],
  };
}
