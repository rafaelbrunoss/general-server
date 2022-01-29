import { inject, injectable } from 'inversify';
import { compare } from 'bcryptjs';

import { IAuthService } from '@core/application/services/auth/authService.interface';
import { IUserRepository } from '@modules/user/core/domain/services/user/user.repository.interface';
import { IUserUnitOfWork } from '@modules/user/core/domain/services/user/user.unitOfWork.interface';
import { User } from '@modules/user/core/domain/models/user.model';
import { AuthenticationRequest } from '@core/application/services/auth/requests/authenticationRequest';
import { SignUpRequest } from '@core/application/services/auth/requests/signUpRequest';
import { AddUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/addUserUnitOfWorkRequest';
import { FindUserByEmailRequest } from '@modules/user/core/domain/services/user/request/findUserByEmailRequest';
import {
  USER_DOMAIN_REPOSITORY_IDENTIFIERS,
  USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS,
} from '@modules/user/core/user.core.module.symbols';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @inject(USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS.USER_UNIT_OF_WORK)
    private readonly userUnitOfWork: IUserUnitOfWork,
  ) {}

  public async signUp({ name, email, password }: SignUpRequest): Promise<User> {
    return this.userUnitOfWork.addUser(
      new AddUserUnitOfWorkRequest({ name, email, password }),
    );
  }

  public async verifyCredentials({
    email,
    password,
  }: AuthenticationRequest): Promise<User | undefined> {
    const user: User = await this.userRepository.findUserByEmail(
      new FindUserByEmailRequest({ email }),
    );

    if (!user || !(await compare(password, user?.password || ''))) {
      return undefined;
    }

    return user;
  }
}
