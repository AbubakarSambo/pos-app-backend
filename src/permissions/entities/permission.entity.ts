import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  orgId: number;

  @ManyToOne(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'id' })
  organization: Organization;
}
