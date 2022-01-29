import { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseError } from '@core/domain/models/errors/baseError.model';
import { CoreError } from '@core/domain/models/errors/coreError.model';

import { ErrorResponse } from '@user_interface/common/errors/errorResponse';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';

export const errorHandler = (app: Application) =>
  app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
    next();
    switch (error.constructor) {
      case UserInterfaceError:
        return res
          .status(parseInt((error as UserInterfaceError).code!))
          .json(new ErrorResponse(error));
      case CoreError:
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json(new ErrorResponse(error));
      case BaseError:
        return res.status(StatusCodes.NOT_FOUND).json(new ErrorResponse(error));
      default:
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
          new ErrorResponse({
            code: StatusCodes.INTERNAL_SERVER_ERROR.toString(),
            message: error.message,
          }),
        );
    }
  });
