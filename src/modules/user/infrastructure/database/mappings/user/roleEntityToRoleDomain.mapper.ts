import { injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from '@core/domain/models/mapper/mapper.interface';
import { Role } from '@modules/user/core/domain/models/role.model';
import { USER_DOMAIN_MAPPING_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { Role as RoleEntity } from '@modules/user/infrastructure/database/entities/sequelize/user/role';
import { USER_DATABASE_MAPPING_IDENTIFIERS } from '@modules/user/infrastructure/infrastructure.symbols';

@injectable()
export class RoleEntityToRoleDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper.createMap<RoleEntity, Role>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      Role,
    );
  }
}
