export class RemoveUserRequest {
  public readonly id: string = '';

  constructor(removeUserRequest: Partial<RemoveUserRequest>) {
    Object.assign(this, removeUserRequest);
  }
}
