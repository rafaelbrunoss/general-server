import { ModelDefined } from 'sequelize';
import { inject, injectable } from 'inversify';

import { IUserRepository } from '@modules/user/core/domain/services/user/user.repository.interface';
import { User } from '@modules/user/core/domain/models/user.model';
import { AddUserRequest } from '@modules/user/core/domain/services/user/request/addUserRequest';
import { UpdateUserRequest } from '@modules/user/core/domain/services/user/request/updateUserRequest';
import { FindUserRequest } from '@modules/user/core/domain/services/user/request/findUserRequest';
import { FindUserByEmailRequest } from '@modules/user/core/domain/services/user/request/findUserByEmailRequest';
import { DeleteUserRequest } from '@modules/user/core/domain/services/user/request/deleteUserRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';
import {
  USER_DOMAIN_REPOSITORY_IDENTIFIERS,
  USER_DOMAIN_MAPPING_IDENTIFIERS,
} from '@modules/user/core/user.core.module.symbols';

import {
  IUserAttributes,
  IUserCreationAttributes,
} from '@modules/user/infrastructure/database/entities/sequelize/user/user';
import { User as UserEntity } from '@modules/user//infrastructure/database/entities/sequelize/user/user';
import { Role as RoleEntity } from '@modules/user//infrastructure/database/entities/sequelize/user/role';
import { SequelizeRepository as Repository } from '@infrastructure/database/repository/sequelize/sequelize.repository';
import { Role } from '@modules/user//infrastructure/database/entities/sequelize/user/role';
import { RoleRepository } from '@modules/user//infrastructure/database/repository/role/role.repository';
import { InfrastructureErrors } from '@modules/user//infrastructure/common/errors/infrastructureErrors';
import { USER_ROLE } from '@modules/user//infrastructure/database/enum/userRole';
import { USER_DATABASE_MAPPING_IDENTIFIERS } from '@modules/user/infrastructure/infrastructure.symbols';
import { DBMapper } from '@infrastructure/database/mappings/dbMapper';
import { MAPPER_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

@injectable()
export class UserRepository
  extends Repository<UserEntity, IUserAttributes, IUserCreationAttributes>
  implements IUserRepository
{
  constructor(
    @inject(MAPPER_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper,
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {
    super(UserEntity as ModelDefined<any, any>);
  }

  public async addUser({
    name,
    email,
    password,
    roleName,
  }: AddUserRequest): Promise<User> {
    const roleEntity = await this.roleRepository.findOneBy({ name: roleName });
    const role = this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      roleEntity as RoleEntity,
    );

    const user = new UserEntity({
      name,
      email,
      password,
      RoleId: role.id,
    });

    const savedUser = await this.save(user);

    return this.dbMapper.mapper.map<UserEntity, User>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      savedUser as UserEntity,
    );
  }

  public async updateUser({
    id,
    name,
    email,
    password,
    roleName,
  }: UpdateUserRequest): Promise<boolean | undefined> {
    const roleEntity = await this.roleRepository.findOneBy({ name: roleName });
    const role = this.dbMapper.mapper.map<RoleEntity, Role>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.ROLE_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.ROLE_ENTITY,
      },
      roleEntity as RoleEntity,
    );

    const user = new UserEntity({
      name,
      email,
      password,
      RoleId: role.id,
    });

    const result = await this.update({ id: parseInt(id) }, user);

    return result;
  }

  public async findUser({ condition, findOptions }: FindUserRequest): Promise<User> {
    const result = await this.findOneBy(condition, findOptions);
    if (!result) {
      throw new BaseError({
        name: InfrastructureErrors[InfrastructureErrors.USER_NOT_FOUND],
      });
    }

    return this.dbMapper.mapper.map<UserEntity, User>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      result as UserEntity,
    );
  }

  public async findUserByEmail({ email }: FindUserByEmailRequest): Promise<User> {
    const result = await this.findOneBy({ email });
    if (!result) {
      throw new BaseError({
        name: InfrastructureErrors[InfrastructureErrors.ROLE_NOT_FOUND],
      });
    }

    return this.dbMapper.mapper.map<UserEntity, User>(
      {
        destination: USER_DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
        source: USER_DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
      },
      result as UserEntity,
    );
  }

  public async deleteUser({ id }: DeleteUserRequest): Promise<void> {
    const result = await this.delete({ id: parseInt(id) });

    if (!result) {
      throw new BaseError({
        name: InfrastructureErrors[InfrastructureErrors.USER_NOT_FOUND],
      });
    }
  }
}
