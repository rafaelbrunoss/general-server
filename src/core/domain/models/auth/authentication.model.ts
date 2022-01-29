import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';

export class Authentication {
  public readonly token: string = '';

  constructor(authentication: Partial<Authentication>) {
    try {
      Object.assign(this, authentication);
      Joi.assert(this, authenticationSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const authenticationSchema = Joi.object({
  token: Joi.string().min(1).max(50),
});
