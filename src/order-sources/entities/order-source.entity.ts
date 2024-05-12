import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  CANCELLED = 'cancelled',
  OPEN = 'open',
  CLOSEDANDPAID = 'closedAndPaid',
  CLOSEDANDUNPAID = 'closedAndUnpaid',
}

// orderSource Living room, Dining, delivery, take out is pickup, OFD jumia, oya now, mo tab, madam tab, yd breakfast, deliveries has delivery amount, is it transfer or cash, vat & dservice charge addition and delivery
@Entity('order-source')
export class OrderSource {
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
