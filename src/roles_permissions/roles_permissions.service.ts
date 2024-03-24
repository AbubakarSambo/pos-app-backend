import { Injectable } from '@nestjs/common';
import { CreateRolesPermissionDto } from './dto/create-roles_permission.dto';
import { UpdateRolesPermissionDto } from './dto/update-roles_permission.dto';
import { Repository } from 'typeorm';
import { RolesPermission } from './entities/roles_permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectRepository(RolesPermission)
    private readonly rolesPermissionsRepository: Repository<RolesPermission>,
  ) {}
  create(createRolesPermissionDto: CreateRolesPermissionDto) {
    return this.rolesPermissionsRepository.save(createRolesPermissionDto);
  }

  findAll() {
    return this.rolesPermissionsRepository.find({
      relations: ['role', 'permission'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesPermission`;
  }

  update(id: number, updateRolesPermissionDto: UpdateRolesPermissionDto) {
    return `This action updates a #${id} rolesPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesPermission`;
  }
}
