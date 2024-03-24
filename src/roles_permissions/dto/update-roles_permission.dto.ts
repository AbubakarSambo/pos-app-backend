import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesPermissionDto } from './create-roles_permission.dto';

export class UpdateRolesPermissionDto extends PartialType(CreateRolesPermissionDto) {}
