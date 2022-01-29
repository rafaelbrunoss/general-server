import { injectable, inject } from 'inversify';
import { createClient, RedisClientType } from 'redis';
import { promisify } from 'util';

import { ICache } from '@infrastructure/cache/cache.interface';
import { InfrastructureError } from '@infrastructure/common/errors/infrastructureError.model';
import { InfrastructureErrors } from '@infrastructure/common/errors/infrastructureErrors.enum';

import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
} from '@user_interface/drivers/common/constants/variables';

@injectable()
export class Redis implements ICache {
  private redis: RedisClientType<{}, Record<any, any>>;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON)
    private readonly logger: ILogger,
  ) {
    this.redis = createClient({
      // url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
      url: `redis://redis:${REDIS_HOST}:${REDIS_PORT}`,
    });
  }

  public async initialize(): Promise<void> {
    await this.redis.connect();
    this.redis.flushAll();

    // @ts-ignore
    this.redis.get = promisify(this.redis.get);
    // @ts-ignore
    this.redis.set = promisify(this.redis.set);

    // await this.redis.set('healthcheck', 'OK');
    this.logger.info(`[Connected to the cache database]`);
  }

  public async get(key: string): Promise<any> {
    try {
      const value: any = await this.redis.get(key);
      if (value) {
        return JSON.parse(value as any);
      }
      return null;
    } catch (err) {
      throw new InfrastructureError({
        name: InfrastructureErrors.CACHE_GET_ERROR,
        code: InfrastructureErrors.CACHE_GET_ERROR,
        message: `Error trying to execute GET in redis: ${err}`,
      });
    }
  }

  public async set(key: string, value: any): Promise<void> {
    try {
      await this.redis.set(key, JSON.stringify(value), {
        EX: 60 * 60 * 24,
      });
    } catch (err) {
      throw new InfrastructureError({
        name: InfrastructureErrors.CACHE_SET_ERROR,
        code: InfrastructureErrors.CACHE_SET_ERROR,
        message: `Error trying to execute SET in redis: ${err}`,
      });
    }
  }

  public async close(): Promise<void> {
    await this.redis.quit();
    this.logger.info(`[Disconnected to the cache database]`);
  }

  public async healthCheck(): Promise<void> {
    try {
      await this.redis.get('healthcheck');
    } catch (err) {
      throw new InfrastructureError({
        name: InfrastructureErrors.CACHE_GET_ERROR,
        code: InfrastructureErrors.CACHE_GET_ERROR,
        message: `Error trying to execute GET in redis: ${err}`,
      });
    }
  }
}
