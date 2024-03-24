import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepository.save(createPermissionDto);
  }

  findAll(orgId: number) {
    return this.permissionRepository.find({
      where: { orgId },
    });
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('Could not find permission');
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updatePermission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (updatePermission.name) {
      updatePermission.name = updatePermissionDto.name;
    }

    const updated = await this.permissionRepository.save(updatePermission);
    return updated;
  }

  async remove(id: number) {
    await this.permissionRepository.delete({ id });
  }
}
