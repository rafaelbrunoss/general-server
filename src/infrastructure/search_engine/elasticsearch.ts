import { inject, injectable } from 'inversify';

import { ISearchEngine } from '@infrastructure/search_engine/searchEngine.interface';

import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class Elasticsearch implements ISearchEngine {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON)
    private readonly logger: ILogger,
  ) {}

  public async initialize(): Promise<void> {
    this.logger.info(`[Connected to the search engine]`);
  }

  public async close(): Promise<void> {
    this.logger.info(`[Disconnected to the search engine]`);
  }

  public async healthCheck(): Promise<any> {
    // TO DO
  }
}
