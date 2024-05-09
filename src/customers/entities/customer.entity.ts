import { Order } from 'src/orders/entities/order.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  email: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  address: string;

  @Column()
  orgId: number;

  @ManyToMany(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'id' })
  organization: Organization;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
