import { Menu } from 'src/menus/entities/menu.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => Menu, (menu) => menu.organization)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.organization)
  orders: Order[];
}
