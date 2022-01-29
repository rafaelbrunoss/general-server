import { Role } from '@modules/user/core/domain/models/role.model';
import { FindRoleRequest } from '@modules/user/core/domain/services/role/request/findRoleRequest';
import { FindRoleByNameRequest } from '@modules/user/core/domain/services/role/request/findRoleByNameRequest';

export interface IRoleRepository {
  findRole(request: FindRoleRequest): Promise<Role>;
  findRoleByName(request: FindRoleByNameRequest): Promise<Role>;
}
