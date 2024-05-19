import { Customer } from 'src/customers/entities/customer.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { OrderSource } from 'src/order-sources/entities/order-source.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  CANCELLED = 'cancelled',
  OPEN = 'open',
  CLOSEDANDPAID = 'closedAndPaid',
  CLOSEDANDUNPAID = 'closedAndUnpaid',
}

// orderSource Living room, Dining, delivery, take out is pickup, OFD jumia, oya now, mo tab, madam tab, yd breakfast, deliveries has delivery amount, is it transfer or cash, vat & dservice charge addition and delivery
@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ManyToOne(() => OrderSource, (orderSource) => orderSource.orders)
  orderSource: OrderSource;

  @ManyToMany(() => Menu, (menu) => menu.orders)
  @JoinTable()
  menuItems: Menu[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  @Column()
  orgId: number;

  @ManyToOne(() => Organization, (organization) => organization.orders)
  @JoinColumn({ name: 'orgId' })
  organization: Organization;
}
