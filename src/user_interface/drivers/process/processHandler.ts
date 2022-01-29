import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { inject, injectable } from 'inversify';
import { createTerminus } from '@godaddy/terminus';

import { ISearchEngine } from '@infrastructure/search_engine/searchEngine.interface';
import { ICache } from '@infrastructure/cache/cache.interface';
import { IOrm } from '@infrastructure/database/orm/orm.interface';
import { INFRASTRUCTURE_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

import { IProcessHandler } from '@user_interface/drivers/process/processHandler.interface';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { K8S_GRACEFUL_PERIOD_OF_SHUTDOWN } from '@user_interface/drivers/common/constants/variables';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class ProcessHandler implements IProcessHandler {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON)
    private readonly logger: ILogger,
    @inject(INFRASTRUCTURE_IDENTIFIERS.ORM)
    private readonly orm: IOrm,
    @inject(INFRASTRUCTURE_IDENTIFIERS.CACHE_DATABASE)
    private readonly cache: ICache,
    @inject(INFRASTRUCTURE_IDENTIFIERS.SEARCH_ENGINE)
    private readonly searchEngine: ISearchEngine,
  ) {}

  public async initialize(server: HttpServer | HttpsServer): Promise<void> {
    createTerminus(server, {
      healthChecks: {
        '/_liveness': this.livenessCheck,
        '/_readiness': this.readinessCheck,
      },
      timeout: 5000,
      signals: ['SIGINT', 'SIGTERM'],
      beforeShutdown: this.onBeforeShutDown,
      onSignal: this.onSignalOfShutDown,
      onShutdown: this.onShutDown,
    });
  }

  private async onBeforeShutDown(): Promise<any> {
    return new Promise((resolve) =>
      setTimeout(resolve, parseInt(K8S_GRACEFUL_PERIOD_OF_SHUTDOWN as string)),
    );
  }

  private async onSignalOfShutDown(): Promise<void> {
    await this.cache.close();
    await this.searchEngine.close();
    await this.orm.close();
  }

  private async onShutDown(): Promise<void> {
    return new Promise((resolve) => {
      this.logger.info('[Shut Down] Cleanup finished, server is shutting down');
      resolve();
    });
  }

  private async livenessCheck(): Promise<void> {
    await this.cache.healthCheck();
    await this.searchEngine.healthCheck();
    await this.orm.healthCheck();
  }

  private async readinessCheck(): Promise<void> {
    await this.cache.healthCheck();
    await this.searchEngine.healthCheck();
    await this.orm.healthCheck();
  }
}
