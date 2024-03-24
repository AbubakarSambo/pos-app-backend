import { Organization } from 'src/organizations/entities/organization.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  orgId: number;

  @ManyToMany(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'id' })
  organization: Organization;
}
