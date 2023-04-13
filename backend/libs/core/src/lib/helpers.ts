import { ClassConstructor, plainToInstance } from 'class-transformer';
import { CommandEvent } from '@backend/shared-types';

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function getRandomPositiveInteger(min: number, max: number): number {
  const from = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const to = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent };
}
