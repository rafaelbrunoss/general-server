import { interfaces } from 'inversify';

import { BaseModule } from '@dependencies/base.module';

import { UserService } from '@modules/user/core/application/services/user/user.service';
import { IUserService } from '@modules/user/core/application/services/user/user.service.interface';
import { IUserRepository } from '@modules/user/core/domain/services/user/user.repository.interface';
import { IUserUnitOfWork } from '@modules/user/core/domain/services/user/user.unitOfWork.interface';
import { IMapper } from '@core/domain/models/mapper/mapper.interface';
import {
  USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  USER_DOMAIN_REPOSITORY_IDENTIFIERS,
  USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from '@modules/user/core/user.core.module.symbols';

import { UserRepository } from '@modules/user/infrastructure/database/repository/user/user.repository';
import { UserUnitOfWork } from '@modules/user/infrastructure/database/repository/user/user.unitOfWork';
import { UserEntityToUserDomainMapper } from '@modules/user/infrastructure/database/mappings/user/userEntityToUserDomain.mapper';
import { USER_MAPPER_IDENTIFIERS } from '@modules/user/infrastructure/infrastructure.symbols';

import { UserDomainToUserUIMapper } from '@user_interface/common/mappings/user/userDomainToUserUIMapper';
import { UI_IDENTIFIERS } from '@user_interface/user_interface.symbols';

export class UserModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserRepository(bind);
    this.provideUserUnitOfWork(bind);

    this.provideUserUIMapper(bind);
    this.provideUserEntityMapper(bind);
    this.provideUserService(bind);
  }

  private provideUserRepository(bind: interfaces.Bind): void {
    bind<IUserRepository>(USER_DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY).to(
      UserRepository,
    );
  }

  private provideUserUnitOfWork(bind: interfaces.Bind): void {
    bind<IUserUnitOfWork>(USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS.USER_UNIT_OF_WORK).to(
      UserUnitOfWork,
    );
  }

  private provideUserService(bind: interfaces.Bind): void {
    bind<IUserService>(USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE).to(
      UserService,
    );
  }

  private provideUserEntityMapper(bind: interfaces.Bind): void {
    bind<IMapper>(USER_MAPPER_IDENTIFIERS.USER_MAPPER).to(
      UserEntityToUserDomainMapper,
    );
  }

  private provideUserUIMapper(bind: interfaces.Bind): void {
    bind<IMapper>(UI_IDENTIFIERS.USER_MAPPER).to(UserDomainToUserUIMapper);
  }
}
