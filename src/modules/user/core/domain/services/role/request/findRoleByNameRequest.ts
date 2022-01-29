import * as Joi from 'joi';

import { roleSchema } from '@modules/user/core/domain/models/role.model';
import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';

export class FindRoleByNameRequest {
  public readonly name: string = '';

  constructor(findRoleByNameRequest: Partial<FindRoleByNameRequest>) {
    try {
      Object.assign(this, findRoleByNameRequest);
      Joi.assert(this, findRoleByNameRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const findRoleByNameRequestSchema = roleSchema;
