import { Customer } from 'src/customers/entities/customer.entity';
import { OrderStatus } from '../entities/order.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { OrderSource } from 'src/order-sources/entities/order-source.entity';

export class CreateOrderDto {
  orderDate: Date;
  customer: Customer;
  orderSource: OrderSource;
  menuItems: Menu[];
  status: OrderStatus;
  orgId: number;
  specialRequest?: string;
}

export class CreateOrderType {
  orderDate: Date;
  customer: number;
  menu: number[];
  status: OrderStatus;
  orgId: number;
  orderSource: number;
  specialRequest?: string;
}
export class UpdateOrderType {
  orderDate?: Date;
  customer?: number;
  menu?: number[];
  status?: OrderStatus;
  orderSource?: number;
  specialRequest?: string;
}
