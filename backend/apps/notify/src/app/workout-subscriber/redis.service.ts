import { Logger } from '@nestjs/common';
import { createClient } from 'redis';

export class RedisService {
  private readonly client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  constructor() {
    this.bootstrap();
  }

  private async bootstrap() {
    this.client.on('error', (err) => Logger.error('Redis Client Error', err));

    await this.client.connect();

    Logger.log('🚀 Redis service is turn on');
  }

  public async finalization() {
    await this.client.shutdown();
    await this.client.disconnect();
    Logger.log('Redis service is turn off');
  }

  public async setValue(key: string, value: string) {
    this.client.rPush(key, value);
  }

  public async getValue(key: string) {
    return this.client.lRange(key, 0, -1);
  }

  public async cleanAllDb() {
    this.client.flushDb();
  }

  public async hasDbKeys(patern: string) {
    return this.client.keys(patern);
  }
}
