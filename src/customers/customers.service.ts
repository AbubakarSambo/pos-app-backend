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

  async searchCustomers(query: string, orgId: number): Promise<Customer[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.orgId = :orgId')
      .andWhere(
        '(LOWER(customer.firstName) LIKE LOWER(:query) OR LOWER(customer.lastName) LIKE LOWER(:query))',
        { query: `%${query}%`, orgId },
      )
      .getMany();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException('Could not find customer');
    }

    return customer;
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
