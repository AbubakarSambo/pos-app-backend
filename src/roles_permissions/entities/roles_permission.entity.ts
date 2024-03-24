import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles_permissions')
export class RolesPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission: Permission;
}
