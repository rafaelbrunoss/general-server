import * as Joi from 'joi';

import { CoreError } from '@core/domain/models/errors/coreError.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { findSchema } from '@core/domain/models/general/find.schema';

export class FindUserRequest {
  public readonly condition: any = {};
  public readonly findOptions?: any = {};

  constructor(findUserRequest: Partial<FindUserRequest>) {
    try {
      Object.assign(this, findUserRequest);
      Joi.assert(this, findUserRequestSchema);
    } catch (error: any) {
      throw new CoreError({
        name: CoreErrors.VALIDATION_ERROR,
        code: CoreErrors.VALIDATION_ERROR,
        message: error.details[0].message,
      });
    }
  }
}

export const findUserRequestSchema = findSchema;
