import { injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from '@core/domain/models/mapper/mapper.interface';
import { User } from '@modules/user/core/domain/models/user.model';
import { USER_DOMAIN_MAPPING_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { User as UserUI } from '@user_interface/common/models/user';
import { UI_MAPPINGS_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class UserDomainToUserUIMapper implements IMapper {
  configureMappings(mapper: Mapper): void {
    mapper.createMap<User, UserUI>(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: USER_DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      User,
    );
  }
}
