import { inject } from 'inversify';

import { BaseError } from '@core/domain/models/errors/baseError.model';

import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

export class UserInterfaceError extends BaseError {
  @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON) private logger!: ILogger;

  constructor(userInterfaceError: UserInterfaceError) {
    super(userInterfaceError);
    Object.assign(this, userInterfaceError);
    this.logger.error(userInterfaceError.message);
  }
}
