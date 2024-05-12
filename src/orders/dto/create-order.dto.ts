import { Customer } from 'src/customers/entities/customer.entity';
import { OrderStatus } from '../entities/order.entity';
import { Menu } from 'src/menus/entities/menu.entity';

export class CreateOrderDto {
  orderDate: Date;
  customer: Customer;
  menu: Menu[];
  status: OrderStatus;
  orgId: number;
}

export class CreateOrderType {
  orderDate: Date;
  customer: number;
  menu: number[];
  status: OrderStatus;
  orgId: number;
  orderSource: number;
}
export class UpdateOrderType {
  orderDate?: Date;
  customer?: number;
  menu?: number[];
  status?: OrderStatus;
}
