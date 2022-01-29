import { inject, injectable } from 'inversify';

import { IUserUnitOfWork } from '@modules/user/core/domain/services/user/user.unitOfWork.interface';
import { IUserRepository } from '@modules/user/core/domain/services/user/user.repository.interface';
import { IRoleRepository } from '@modules/user/core/domain/services/role/role.repository.interface';
import { User } from '@modules/user/core/domain/models/user.model';
import { AddUserRequest } from '@modules/user/core/domain/services/user/request/addUserRequest';
import { FindRoleByNameRequest } from '@modules/user/core/domain/services/role/request/findRoleByNameRequest';
import { AddUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/addUserUnitOfWorkRequest';
import { DeleteUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/deleteUserUnitOfWorkRequest';
import { DeleteUserRequest } from '@modules/user/core/domain/services/user/request/deleteUserRequest';
import { USER_DOMAIN_REPOSITORY_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { USER_ROLE } from '@modules/user/infrastructure/database/enum/userRole';
import { UnitOfWork } from '@infrastructure/database/repository/unitOfWork';

@injectable()
export class UserUnitOfWork extends UnitOfWork implements IUserUnitOfWork {
  constructor(
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {
    super();
  }

  public async addUser({
    name,
    email,
    password,
  }: AddUserUnitOfWorkRequest): Promise<User> {
    const { id } = await this.roleRepository.findRoleByName(
      new FindRoleByNameRequest({
        name: USER_ROLE.MEMBER,
      }),
    );

    return this.userRepository.addUser(
      new AddUserRequest({
        name,
        email,
        password,
        roleName: (+id).toString(),
      }),
    );
  }

  public async deleteUser({ id }: DeleteUserUnitOfWorkRequest): Promise<void> {
    await this.userRepository.deleteUser(new DeleteUserRequest({ id }));
  }
}
