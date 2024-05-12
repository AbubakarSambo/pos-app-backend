import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderSourceDto } from './dto/create-order-source.dto';
import { UpdateOrderSourceDto } from './dto/update-order-source.dto';
import { OrderSource } from './entities/order-source.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderSourcesService {
  constructor(
    @InjectRepository(OrderSource)
    private readonly orderSourceRepository: Repository<OrderSource>,
  ) {}
  create(createOrderSourceDto: CreateOrderSourceDto) {
    return this.orderSourceRepository.save(createOrderSourceDto);
  }

  findAll(orgId: number) {
    return this.orderSourceRepository.find({
      where: { orgId },
    });
  }

  async findOne(id: number) {
    const orderSource = await this.orderSourceRepository.findOne({
      where: { id },
    });
    if (!orderSource) {
      throw new NotFoundException('Could not find order Source');
    }

    return orderSource;
  }

  async update(id: number, updateOrderSourceDto: UpdateOrderSourceDto) {
    const orderSourceToUpdate = await this.orderSourceRepository.findOne({
      where: { id },
    });

    if (orderSourceToUpdate.name) {
      orderSourceToUpdate.name = updateOrderSourceDto.name;
    }

    const updated = await this.orderSourceRepository.save(orderSourceToUpdate);
    return updated;
  }

  async remove(id: number) {
    await this.orderSourceRepository.delete({ id });
  }
}
