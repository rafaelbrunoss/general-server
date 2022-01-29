export class CreateUserRequest {
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';
  public readonly roleName: string = '';

  constructor(createUserRequest: Partial<CreateUserRequest>) {
    Object.assign(this, createUserRequest);
  }
}
