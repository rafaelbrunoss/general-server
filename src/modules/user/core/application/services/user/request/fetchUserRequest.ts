export class FetchUserRequest {
  public readonly condition: any = {};
  public readonly findOptions?: any = {};

  constructor(fetchUserRequest: Partial<FetchUserRequest>) {
    Object.assign(this, fetchUserRequest);
  }
}
