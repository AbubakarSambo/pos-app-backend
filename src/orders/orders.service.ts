import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
// import { Menu } from 'src/menus/entities/menu.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  findAll(orgId: number) {
    return this.orderRepository.find({
      where: { orgId },
      relations: ['menuItems', 'customer', 'orderSource'],
      order: {
        orderDate: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['menuItems', 'customer', 'orderSource'],
    });
    if (!order) {
      throw new NotFoundException('Could not find order');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderToUpdate = await this.orderRepository.findOne({
      where: { id },
      relations: ['menuItems', 'customer', 'orderSource'],
    });

    if (orderToUpdate.status) {
      orderToUpdate.status = updateOrderDto.status;
    }
    if (orderToUpdate.menuItems) {
      orderToUpdate.menuItems = updateOrderDto.menuItems;
    }
    if (orderToUpdate.customer) {
      orderToUpdate.customer = updateOrderDto.customer;
    }
    if (orderToUpdate.orderSource) {
      orderToUpdate.orderSource = updateOrderDto.orderSource;
    }
    const updated = await this.orderRepository.save(orderToUpdate);
    return updated;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async findAllItemsInWeek(
    startDate: Date,
    endDate: Date,
    orgId: number,
  ): Promise<Order[]> {
    const itemsInWeek = await this.orderRepository.find({
      relations: ['menuItems'],
      where: {
        orderDate: Between(startDate, endDate),
        orgId,
      },
    });
    return itemsInWeek;
  }
}
