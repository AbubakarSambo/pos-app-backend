import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Menu } from 'src/menus/entities/menu.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    console.log({ createOrderDto });
    return this.orderRepository.save(createOrderDto);
  }

  findAll(orgId: number) {
    return this.orderRepository.find({
      where: { orgId },
      relations: ['menu', 'customer', 'orderSource'],
      order: {
        orderDate: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('Could not find order');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderToUpdate = await this.orderRepository.findOne({
      where: { id },
    });

    if (orderToUpdate.status) {
      orderToUpdate.status = updateOrderDto.status;
    }
    if (orderToUpdate.menu) {
      orderToUpdate.menu = updateOrderDto.menu;
    }
    if (orderToUpdate.customer) {
      orderToUpdate.customer = updateOrderDto.customer;
    }

    const updated = await this.orderRepository.save(orderToUpdate);
    return updated;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  // async findMenusInOrder(menuId: number): Promise<Menu[]> {
  //   return this.menuRepository
  //     .createQueryBuilder('order')
  //     .leftJoinAndSelect('order.menu', 'menu')
  //     .where('menu.id = :id', { menuId })
  //     .getMany();
  // }
}
