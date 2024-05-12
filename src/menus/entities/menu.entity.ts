import { Category } from 'src/categories/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.menus)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  orgId: number;

  @ManyToOne(() => Organization, (organization) => organization.menus)
  @JoinColumn({ name: 'orgId' })
  organization: Organization;

  @ManyToMany(() => Order, (order) => order.menuItems)
  orders: Order[];
}
