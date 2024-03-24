import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
