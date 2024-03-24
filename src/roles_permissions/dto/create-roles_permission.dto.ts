import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';

export class CreateRolesPermissionDto {
  role: Role;
  permission: Permission;

  constructor(role: Role, permission: Permission) {
    this.role = role;
    this.permission = permission;
  }
}
