import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';

export class Role {
  public readonly id: string = '';
  public readonly name: string = '';

  constructor(role: Partial<Role>) {
    try {
      Object.assign(this, role);
      Joi.assert(this, roleSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const roleSchema = Joi.object({
  id: Joi.string().min(1),
  name: Joi.string().min(1).max(50),
});
