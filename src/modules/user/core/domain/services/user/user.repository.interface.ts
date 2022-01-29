import { User } from '@modules/user/core/domain/models/user.model';
import { AddUserRequest } from '@modules/user/core/domain/services/user/request/addUserRequest';
import { UpdateUserRequest } from '@modules/user/core/domain/services/user/request/updateUserRequest';
import { FindUserRequest } from '@modules/user/core/domain/services/user/request/findUserRequest';
import { FindUserByEmailRequest } from '@modules/user/core/domain/services/user/request/findUserByEmailRequest';
import { DeleteUserRequest } from '@modules/user/core/domain/services/user/request/deleteUserRequest';

export interface IUserRepository {
  addUser(request: AddUserRequest): Promise<User>;
  updateUser(request: UpdateUserRequest): Promise<boolean | undefined>;
  findUser(request: FindUserRequest): Promise<User>;
  findUserByEmail(request: FindUserByEmailRequest): Promise<User>;
  deleteUser(request: DeleteUserRequest): Promise<void>;
}
