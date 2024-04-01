import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto, orgId: number) {
    const customerData = {
      ...createCustomerDto,
      orgId,
    };
    return this.customerRepository.save(customerData);
  }

  findAll(skip = 0, take = 20, orgId): Promise<[Customer[], number]> {
    return this.customerRepository.findAndCount({
      skip,
      take,
      where: { orgId: orgId },
    });
  }

  async findOne(id: number) {
    const category = await this.customerRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Could not find category');
    }

    return category;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updateCustomer = await this.customerRepository.findOne({
      where: { id },
    });

    if (updateCustomerDto.firstName) {
      updateCustomer.firstName = updateCustomerDto.firstName;
    }
    if (updateCustomerDto.lastName) {
      updateCustomer.lastName = updateCustomerDto.lastName;
    }
    if (updateCustomerDto.email) {
      updateCustomer.email = updateCustomerDto.email;
    }
    if (updateCustomerDto.phone) {
      updateCustomer.phone = updateCustomerDto.phone;
    }
    if (updateCustomerDto.address) {
      updateCustomer.address = updateCustomerDto.address;
    }
    const updated = await this.customerRepository.save(updateCustomer);
    return updated;
  }

  async remove(id: number) {
    await this.customerRepository.delete({ id });
  }
}
