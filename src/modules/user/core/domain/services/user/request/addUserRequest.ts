import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { userSchema } from '@modules/user/core/domain/models/user.model';

export class AddUserRequest {
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';
  public readonly roleName: string = '';

  constructor(addUserRequest: Partial<AddUserRequest>) {
    try {
      Object.assign(this, addUserRequest);
      Joi.assert(this, addUserRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const addUserRequestSchema = userSchema.keys({
  roleName: Joi.string().min(1).max(50),
});
