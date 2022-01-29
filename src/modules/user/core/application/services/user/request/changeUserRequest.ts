export class ChangeUserRequest {
  public readonly id: string = '';
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly password: string = '';
  public readonly roleName: string = '';

  constructor(changeUserRequest: Partial<ChangeUserRequest>) {
    Object.assign(this, changeUserRequest);
  }
}
