export class Role {
  public readonly id: string = '';
  public readonly name: string = '';

  constructor(role: Partial<Role>) {
    Object.assign(this, role);
  }
}
