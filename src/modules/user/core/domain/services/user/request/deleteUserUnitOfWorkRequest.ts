import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { userSchema } from '@modules/user/core/domain/models/user.model';

export class DeleteUserUnitOfWorkRequest {
  public readonly id: string = '';

  constructor(deleteUserUnitOfWorkRequest: Partial<DeleteUserUnitOfWorkRequest>) {
    try {
      Object.assign(this, deleteUserUnitOfWorkRequest);
      Joi.assert(this, deleteUserUnitOfWorkRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const deleteUserUnitOfWorkRequestSchema = userSchema;
