import { Mapper } from '@wufe/mapper';
import { inject, injectable } from 'inversify';

import { RoleEntityToRoleDomainMapper } from '@modules/user/infrastructure/database/mappings/user/roleEntityToRoleDomain.mapper';
import { UserEntityToUserDomainMapper } from '@modules/user/infrastructure/database/mappings/user/userEntityToUserDomain.mapper';
import { USER_MAPPER_IDENTIFIERS } from '@modules/user/infrastructure/infrastructure.symbols';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor(
    @inject(USER_MAPPER_IDENTIFIERS.ROLE_MAPPER)
    private readonly roleEntityToRoleDomainMapper: RoleEntityToRoleDomainMapper,
    @inject(USER_MAPPER_IDENTIFIERS.USER_MAPPER)
    private readonly userEntityToUserDomainMapper: UserEntityToUserDomainMapper,
  ) {
    this.mapper = new Mapper().withConfiguration((configuration) =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true),
    );

    this.initialize();
  }

  private initialize(): void {
    this.roleEntityToRoleDomainMapper.configureMappings(this.mapper);
    this.userEntityToUserDomainMapper.configureMappings(this.mapper);
  }
}
