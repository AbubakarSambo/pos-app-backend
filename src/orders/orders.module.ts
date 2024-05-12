import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { Order } from './entities/order.entity';
import { CustomersService } from 'src/customers/customers.service';
import { MenusService } from 'src/menus/menus.service';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrderSource } from 'src/order-sources/entities/order-source.entity';
import { OrderSourcesService } from 'src/order-sources/order-sources.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Menu, Customer, OrderSource])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    CustomersService,
    MenusService,
    OrderSourcesService,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
