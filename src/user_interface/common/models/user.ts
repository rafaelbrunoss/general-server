import { Role } from '@user_interface/common/models/role';

export class User {
  public readonly id: string = '';
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly role: Role = new Role({});

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
