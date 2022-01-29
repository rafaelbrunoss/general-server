import { User } from '@modules/user/core/domain/models/user.model';
import { AddUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/addUserUnitOfWorkRequest';
import { DeleteUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/deleteUserUnitOfWorkRequest';

export interface IUserUnitOfWork {
  addUser(request: AddUserUnitOfWorkRequest): Promise<User>;
  deleteUser(request: DeleteUserUnitOfWorkRequest): Promise<void>;
}
