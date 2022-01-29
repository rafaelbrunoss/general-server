import { inject, injectable } from 'inversify';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { IAuthService } from '@core/application/services/auth/authService.interface';
import { AuthenticationRequest } from '@core/application/services/auth/requests/authenticationRequest';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from '@core/core.module.symbols';

import { User } from '@modules/user/core/domain/models/user.model';
import {
  USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  USER_DOMAIN_MAPPING_IDENTIFIERS,
} from '@modules/user/core/user.core.module.symbols';

import { IAuthenticationHandler } from '@user_interface/drivers/auth/authenticationHandler.interface';
import { Authentication } from '@user_interface/drivers/auth/models/authentication';
import { JWTTokenUtil } from '@user_interface/drivers/auth/utils/jwtTokenUtil';
import { User as UserUI } from '@user_interface/common/models/user';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';
import { UIMapper } from '@user_interface/common/mappings/user_interface.mapper';
import {
  APP_TOKEN_LIFE,
  APP_TOKEN_SECRET,
} from '@user_interface/drivers/common/constants/variables';
import {
  UI_APPLICATION_IDENTIFIERS,
  UI_IDENTIFIERS,
  UI_MAPPINGS_IDENTIFIERS,
} from '@user_interface/user_interface.symbols';

@injectable()
export class JWTAuthenticationHandler implements IAuthenticationHandler {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
    private readonly jwtTokenUtil: JWTTokenUtil,
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTH_SERVICE)
    private readonly authService: IAuthService,
    @inject(UI_IDENTIFIERS.UI_MAPPER)
    private readonly uiMapper: UIMapper,
  ) {}

  public async authenticate(
    request: AuthenticationRequest,
  ): Promise<Authentication> {
    const user = await this.authService.verifyCredentials(request);

    if (!user) {
      throw new UserInterfaceError({
        code: CommomHttpErrors.UNAUTHORIZED,
        name: UserInterfaceErrors.UNAUTHORIZED,
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED).toUpperCase(),
      });
    }

    const userUi = this.uiMapper.mapper.map<User, UserUI>(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: USER_DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      user,
    );

    return new Authentication(
      this.jwtTokenUtil.generateToken(
        userUi,
        'user',
        APP_TOKEN_SECRET as string,
        APP_TOKEN_LIFE as string,
      ),
    );
  }
}
