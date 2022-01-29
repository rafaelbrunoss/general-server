import { InversifyExpressServer } from 'inversify-express-utils';

import { errorHandler } from '@user_interface/common/errors/errorHandler';
import { ExpressApplication } from '@user_interface/drivers/application/expressApplication';
import { ApplicationAuthProvider } from '@user_interface/drivers/auth/middlewares/applicationAuthProvider';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

import { BaseContainer } from '@dependencies/base.container';
import { ApplicationModule } from '@dependencies/common/application.module';
import { CommonModule } from '@dependencies/common/common.module';

import { AuthModule } from '@dependencies/authModule';
import { RoleModule } from '@modules/user/roleModule';
import { UserModule } from '@modules/user/userModule';

export class AppContainer extends BaseContainer {
  constructor() {
    super({
      defaultScope: 'Singleton',
      skipBaseClassChecks: true,
    });
  }

  /**
   * @description Order of initialization matters
   */
  public init(): void {
    this.provideCommonModule();
    this.provideApplicationModule();

    this.provideAuthModule();
    this.provideRoleModule();
    this.provideUserModule();

    this.provideInversifyExpressApplication();
  }

  private provideApplicationModule(): void {
    this.load(new ApplicationModule());
  }

  private provideCommonModule(): void {
    this.load(new CommonModule());
  }

  private provideAuthModule(): void {
    this.load(new AuthModule());
  }

  private provideUserModule(): void {
    this.load(new UserModule());
  }

  private provideRoleModule(): void {
    this.load(new RoleModule());
  }

  private provideInversifyExpressApplication(): void {
    this.bind<InversifyExpressServer>(
      UI_APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION,
    ).toConstantValue(
      new InversifyExpressServer(
        this,
        null,
        { rootPath: '/' },
        this.get<ExpressApplication>(
          UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION,
        ).getApplication(),
        ApplicationAuthProvider,
      ).setErrorConfig(errorHandler),
    );
  }
}
