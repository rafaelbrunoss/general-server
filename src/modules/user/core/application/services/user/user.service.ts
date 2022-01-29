import { inject, injectable } from 'inversify';

import { IUserService } from '@modules/user/core/application/services/user/user.service.interface';
import { IUserRepository } from '@modules/user/core/domain/services/user/user.repository.interface';
import { IUserUnitOfWork } from '@modules/user/core/domain/services/user/user.unitOfWork.interface';
import { User } from '@modules/user/core/domain/models/user.model';
import { CreateUserRequest } from '@modules/user/core/application/services/user/request/createUserRequest';
import { ChangeUserRequest } from '@modules/user/core/application/services/user/request/changeUserRequest';
import { FetchUserRequest } from '@modules/user/core/application/services/user/request/fetchUserRequest';
import { AddUserRequest } from '@modules/user/core/domain/services/user/request/addUserRequest';
import { UpdateUserRequest } from '@modules/user/core/domain/services/user/request/updateUserRequest';
import { FindUserRequest } from '@modules/user/core/domain/services/user/request/findUserRequest';
import { RemoveUserRequest } from '@modules/user/core/application/services/user/request/removeUserRequest';
import { DeleteUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/deleteUserUnitOfWorkRequest';
import {
  USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
  USER_DOMAIN_REPOSITORY_IDENTIFIERS,
} from '@modules/user/core/user.core.module.symbols';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS.USER_UNIT_OF_WORK)
    private readonly userUnitOfWork: IUserUnitOfWork,
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async removeUser({ id }: RemoveUserRequest): Promise<void> {
    return this.userUnitOfWork.deleteUser(new DeleteUserUnitOfWorkRequest({ id }));
  }

  public async fetchUser({
    condition,
    findOptions,
  }: FetchUserRequest): Promise<User> {
    return this.userRepository.findUser(
      new FindUserRequest({ condition, findOptions }),
    );
  }

  public async createUser({
    name,
    email,
    password,
    roleName,
  }: CreateUserRequest): Promise<User> {
    return this.userUnitOfWork.addUser(
      new AddUserRequest({ name, email, password, roleName }),
    );
  }

  public async changeUser({
    id,
    name,
    email,
    password,
    roleName,
  }: ChangeUserRequest): Promise<boolean | undefined> {
    return this.userRepository.updateUser(
      new UpdateUserRequest({ id, name, email, password, roleName }),
    );
  }
}
