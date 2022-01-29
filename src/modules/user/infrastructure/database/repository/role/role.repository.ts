import { ModelDefined } from 'sequelize';
import { inject, injectable } from 'inversify';

import { IRoleRepository } from '@modules/user/core/domain/services/role/role.repository.interface';
import { FindRoleRequest } from '@modules/user/core/domain/services/role/request/findRoleRequest';
import { Role } from '@modules/user/core/domain/models/role.model';
import { FindRoleByNameRequest } from '@modules/user/core/domain/services/role/request/findRoleByNameRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';
import { USER_DOMAIN_MAPPING_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import {
  IRoleAttributes,
  IRoleCreationAttributes,
} from '@modules/user/infrastructure/database/entities/sequelize/user/role';
import { Role as RoleEntity } from '@modules/user/infrastructure/database/entities/sequelize/user/role';
import { DBMapper } from '@infrastructure/database/mappings/dbMapper';
import { SequelizeRepository as Repository } from '@infrastructure/database/repository/sequelize/sequelize.repository';
import { InfrastructureErrors } from '@modules/user/infrastructure/common/errors/infrastructureErrors';
import {
  USER_DATABASE_MAPPING_IDENTIFIERS,
  USER_MAPPER_IDENTIFIERS,
} from '@modules/user/infrastructure/infrastructure.symbols';

@injectable()
export class RoleRepository
  extends Repository<RoleEntity, IRoleAttributes, IRoleCreationAttributes>
  implements IRoleRepository
{
  constructor(
    @inject(USER_MAPPER_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper,
  ) {
    super(RoleEntity as ModelDefined<any, any>);
  }

  async findRole({ id }: FindRoleRequest): Promise<Role> {
    const result = await this.findById(id);
    if (!result) {
      throw new BaseError({
        name: InfrastructureErrors[InfrastructureErrors.ROLE_NOT_FOUND],
      });
    }

    return this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      result as RoleEntity,
    );
  }

  async findRoleByName({ name }: FindRoleByNameRequest): Promise<Role> {
    const result = await this.findOneBy({ name });
    if (!result) {
      throw new BaseError({
        name: InfrastructureErrors[InfrastructureErrors.ROLE_NOT_FOUND],
      });
    }

    return this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      result as RoleEntity,
    );
  }
}
