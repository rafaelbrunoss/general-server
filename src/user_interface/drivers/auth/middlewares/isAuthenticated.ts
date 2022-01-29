import * as express from 'express';

import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { getCurrentUser } from '@user_interface/drivers/auth/utils/getHttpContext';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';

export const isAuthenticated =
  (config?: { role: string }) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    const user = getCurrentUser(req);

    if (!user) {
      next(
        new UserInterfaceError({
          name: UserInterfaceErrors.UNAUTHORIZED,
          code: CommomHttpErrors.UNAUTHORIZED,
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED).toUpperCase(),
        }),
      );
      return;
    }

    const isAuthenticatedUser = await user.isAuthenticated();

    if (!isAuthenticatedUser) {
      next(
        new UserInterfaceError({
          name: UserInterfaceErrors.UNAUTHORIZED,
          code: CommomHttpErrors.UNAUTHORIZED,
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED).toUpperCase(),
        }),
      );
      return;
    }
    if (config) {
      const isInRole = await user.isInRole(config.role);
      if (!isInRole) {
        next(
          new UserInterfaceError({
            name: UserInterfaceErrors.FORBIDDEN,
            code: CommomHttpErrors.FORBIDDEN,
            message: getReasonPhrase(StatusCodes.FORBIDDEN).toUpperCase(),
          }),
        );
        return;
      }
    }
    next();
  };
