import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { userSchema } from '@modules/user/core/domain/models/user.model';

export class UpdateUserRequest {
  public readonly id: string = '';
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';
  public readonly roleName: string = '';

  constructor(updateUserRequest: Partial<UpdateUserRequest>) {
    try {
      Object.assign(this, updateUserRequest);
      Joi.assert(this, updateUserRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const updateUserRequestSchema = userSchema.keys({
  roleName: Joi.string().min(1).max(50),
});
