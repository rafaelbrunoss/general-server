import { interfaces } from 'inversify';

import { BaseModule } from '@dependencies/base.module';

import { IAuthService } from '@core/application/services/auth/authService.interface';
import { AuthService } from '@core/application/services/auth/authService';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from '@core/core.module.symbols';

export class AuthModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideAuthService(bind);
  }

  private provideAuthService(bind: interfaces.Bind): void {
    bind<IAuthService>(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTH_SERVICE).to(
      AuthService,
    );
  }
}
