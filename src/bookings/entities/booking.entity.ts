import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @Column({ default: false })
  confirmed: boolean;

  @Column()
  orgId: number;

  @ManyToOne(() => Organization, (organization) => organization.orders)
  @JoinColumn({ name: 'orgId' })
  organization: Organization;
}
