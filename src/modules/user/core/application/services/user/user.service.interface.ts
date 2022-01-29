import { User } from '@modules/user/core/domain/models/user.model';
import { CreateUserRequest } from '@modules/user/core/application/services/user/request/createUserRequest';
import { ChangeUserRequest } from '@modules/user/core/application/services/user/request/changeUserRequest';
import { FetchUserRequest } from '@modules/user/core/application/services/user/request/fetchUserRequest';
import { RemoveUserRequest } from '@modules/user/core/application/services/user/request/removeUserRequest';

export interface IUserService {
  createUser(request: CreateUserRequest): Promise<User>;
  changeUser(request: ChangeUserRequest): Promise<boolean | undefined>;
  fetchUser(request: FetchUserRequest): Promise<User>;
  removeUser(request: RemoveUserRequest): Promise<void>;
}
