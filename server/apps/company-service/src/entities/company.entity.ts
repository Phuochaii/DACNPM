import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: number;
  @Column()
  taxCode: string;
  @Column()
  name: string;
  @Column()
  website: string;
  @Column({ nullable: true })
  image: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  companySize: number;
  @Column({ nullable: true })
  description: string;
  @Column({ default: false })
  status: boolean;
}
