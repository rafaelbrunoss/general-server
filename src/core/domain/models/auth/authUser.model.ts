import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';

export class AuthUser {
  public readonly id: string = '';
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';

  constructor(authUser: Partial<AuthUser>) {
    try {
      Object.assign(this, authUser);
      Joi.assert(this, authUserSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const authUserSchema = Joi.object({
  id: Joi.string().min(1),
  name: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(1).max(50),
});
