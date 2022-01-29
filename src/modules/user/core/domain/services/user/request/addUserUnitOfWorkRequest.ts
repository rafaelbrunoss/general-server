import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { userSchema } from '@modules/user/core/domain/models/user.model';

export class AddUserUnitOfWorkRequest {
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';

  constructor(addUserUnitOfWorkRequest: Partial<AddUserUnitOfWorkRequest>) {
    try {
      Object.assign(this, addUserUnitOfWorkRequest);
      Joi.assert(this, addUserUnitOfWorkRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const addUserUnitOfWorkRequestSchema = userSchema;
