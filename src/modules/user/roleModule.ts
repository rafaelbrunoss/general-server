import { interfaces } from 'inversify';

import { BaseModule } from '@dependencies/base.module';

import { IRoleRepository } from '@modules/user/core/domain/services/role/role.repository.interface';
import { IMapper } from '@core/domain/models/mapper/mapper.interface';
import { USER_DOMAIN_REPOSITORY_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { RoleRepository } from '@modules/user/infrastructure/database/repository/role/role.repository';
import { RoleEntityToRoleDomainMapper } from '@modules/user/infrastructure/database/mappings/user/roleEntityToRoleDomain.mapper';
import { USER_MAPPER_IDENTIFIERS } from '@modules/user/infrastructure/infrastructure.symbols';

export class RoleModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideRoleMapper(bind);

    this.provideRoleRepository(bind);
  }

  private provideRoleMapper(bind: interfaces.Bind): void {
    bind<IMapper>(USER_MAPPER_IDENTIFIERS.ROLE_MAPPER).to(
      RoleEntityToRoleDomainMapper,
    );
  }

  private provideRoleRepository(bind: interfaces.Bind): void {
    bind<IRoleRepository>(USER_DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY).to(
      RoleRepository,
    );
  }
}
