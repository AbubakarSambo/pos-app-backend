import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { RolesPermissionsController } from './roles_permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermission } from './entities/roles_permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPermission])],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule {}
