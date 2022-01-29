import * as Joi from 'joi';

import { Role, roleSchema } from '@modules/user/core/domain/models/role.model';
import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';

export class User {
  public readonly id: string = '';
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';
  public readonly role: Role = new Role({});

  constructor(user: Partial<User>) {
    try {
      Object.assign(this, user);
      Joi.assert(this, userSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const userSchema = Joi.object({
  id: Joi.string().min(1),
  name: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(1).max(50),
  role: roleSchema,
});
