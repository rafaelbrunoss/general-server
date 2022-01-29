import { injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from '@core/domain/models/mapper/mapper.interface';
import { User } from '@modules/user/core/domain/models/user.model';
import { USER_DOMAIN_MAPPING_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { User as UserEntity } from '@modules/user/infrastructure/database/entities/sequelize/user/user';
import { USER_DATABASE_MAPPING_IDENTIFIERS } from '@modules/user/infrastructure/infrastructure.symbols';

@injectable()
export class UserEntityToUserDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper
      .createMap<UserEntity, User>(
        {
          destination: USER_DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
          source: USER_DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
        },
        User,
      )
      .forMember('role', (opt) => opt.mapFrom((src) => src.RoleId));
  }
}
