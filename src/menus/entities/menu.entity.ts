import { Category } from 'src/categories/entities/category.entity';
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

  @ManyToOne(() => Category, (org) => org.id)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: Category;

  @Column()
  orgId: number;

  @ManyToMany(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'id' })
  organization: Organization;
}
