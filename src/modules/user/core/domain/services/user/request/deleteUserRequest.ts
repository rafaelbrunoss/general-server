import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { userSchema } from '@modules/user/core/domain/models/user.model';

export class DeleteUserRequest {
  public readonly id: string = '';

  constructor(deleteUserRequest: Partial<DeleteUserRequest>) {
    try {
      Object.assign(this, deleteUserRequest);
      Joi.assert(this, deleteUserRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const deleteUserRequestSchema = userSchema;
