import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  orgId: number;

  @ManyToMany(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'id' })
  organization: Organization;
}
