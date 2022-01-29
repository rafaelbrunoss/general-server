export class AuthenticationRequest {
  public readonly email: string = '';
  public readonly password: string = '';

  constructor(authenticationRequest: Partial<AuthenticationRequest>) {
    Object.assign(this, authenticationRequest);
  }
}
