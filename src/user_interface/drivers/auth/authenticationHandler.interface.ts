import { AuthenticationRequest } from '@core/application/services/auth/requests/authenticationRequest';
import { Authentication } from '@user_interface/drivers/auth/models/authentication';

export interface IAuthenticationHandler {
  authenticate(request: AuthenticationRequest): Promise<Authentication>;
}
