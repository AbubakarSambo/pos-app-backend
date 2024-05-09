import { Customer } from 'src/customers/entities/customer.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Menu, (menuItem) => menuItem.order, { cascade: true })
  menu: Menu[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  @Column()
  orgId: number;

  @ManyToMany(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'id' })
  organization: Organization;
}
