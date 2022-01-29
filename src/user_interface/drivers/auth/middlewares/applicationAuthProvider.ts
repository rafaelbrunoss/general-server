import { inject, injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';

import { UserService } from '@modules/user/core/application/services/user/user.service';
import { FetchUserRequest } from '@modules/user/core/application/services/user/request/fetchUserRequest';
import { USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { Principal } from '@user_interface/drivers/auth/models/principal';
import { User } from '@user_interface/common/models/user';
import { JWTTokenUtil } from '@user_interface/drivers/auth/utils/jwtTokenUtil';
import { ITokenPayload } from '@user_interface/drivers/auth/types/tokenPayload.interface';
import { APP_TOKEN_SECRET } from '@user_interface/drivers/common/constants/variables';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class ApplicationAuthProvider implements interfaces.AuthProvider {
  @inject(USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE)
  private readonly userService!: UserService;

  @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
  private readonly jwtTokenUtil!: JWTTokenUtil;

  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<interfaces.Principal> {
    const token = this.jwtTokenUtil.getTokenFromHeaders(req.headers);
    if (!token) {
      return new Principal(undefined);
    }
    const tokenData = await this.jwtTokenUtil.decodeToken(
      token,
      APP_TOKEN_SECRET as string,
    );

    if (!tokenData) {
      return new Principal(undefined);
    }

    const { user } = tokenData as ITokenPayload;

    try {
      const existingUser = await this.userService.fetchUser(
        new FetchUserRequest({ condition: user.id }),
      );

      if (!existingUser) {
        return new Principal(undefined);
      }

      return new Principal(new User(user));
    } catch (error) {
      next(error);
      return new Principal(undefined);
    }
  }
}
