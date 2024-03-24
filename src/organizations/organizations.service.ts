import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.organizationRepository.save(createOrganizationDto);
  }

  findAll(skip = 0, take = 20): Promise<[Organization[], number]> {
    return this.organizationRepository.findAndCount({ skip, take });
  }

  async findOne(id: number) {
    const org = await this.organizationRepository.findOne({ where: { id } });
    if (!org) {
      throw new NotFoundException('Could not find organization');
    }

    return org;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const updateOrganization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (updateOrganizationDto.name) {
      updateOrganization.name = updateOrganizationDto.name;
    }
    if (updateOrganizationDto.location) {
      updateOrganization.location = updateOrganizationDto.location;
    }
    if (updateOrganizationDto.address) {
      updateOrganization.address = updateOrganizationDto.address;
    }
    if (updateOrganizationDto.phone) {
      updateOrganization.phone = updateOrganizationDto.phone;
    }
    if (updateOrganizationDto.logo) {
      updateOrganization.logo = updateOrganizationDto.logo;
    }
    const updated = await this.organizationRepository.save(updateOrganization);
    return updated;
  }

  async remove(id: number) {
    await this.organizationRepository.delete({ id });
  }
}
