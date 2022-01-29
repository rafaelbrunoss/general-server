import { User } from '@modules/user/core/domain/models/user.model';
import { AuthenticationRequest } from '@core/application/services/auth/requests/authenticationRequest';
import { SignUpRequest } from '@core/application/services/auth/requests/signUpRequest';

export interface IAuthService {
  signUp(request: SignUpRequest): Promise<User>;
  verifyCredentials(request: AuthenticationRequest): Promise<User | undefined>;
}
