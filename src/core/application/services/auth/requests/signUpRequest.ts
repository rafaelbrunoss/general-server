export class SignUpRequest {
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';

  constructor(signUpRequest: Partial<SignUpRequest>) {
    Object.assign(this, signUpRequest);
  }
}
