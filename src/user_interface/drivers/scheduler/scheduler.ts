import { inject, injectable } from 'inversify';

import { IScheduler } from '@user_interface/drivers/scheduler/scheduler.interface';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';

@injectable()
export class Scheduler implements IScheduler {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON)
    private readonly logger: ILogger,
  ) {}

  public async initialize(): Promise<void> {
    this.logger.info(`[Starting jobs of the scheduler]`);
  }
}
