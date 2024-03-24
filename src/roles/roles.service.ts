import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll(orgId: number) {
    return this.roleRepository.find({
      where: { orgId },
    });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException('Could not find role');
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updateRole = await this.roleRepository.findOne({
      where: { id },
    });

    if (updateRole.name) {
      updateRole.name = updateRoleDto.name;
    }

    const updated = await this.roleRepository.save(updateRole);
    return updated;
  }

  remove(id: number) {
    return this.roleRepository.delete({ id });
  }
}
