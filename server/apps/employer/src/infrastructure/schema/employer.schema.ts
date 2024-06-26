import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Employer } from '../../domain/entity';

interface _ extends Employer {}

@Entity('Employer')
export class EmployerSchema implements _ {
  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;
  @Column()
  gender: string;

  @Column()
  positionId: number;

  @Column({ nullable: true })
  skype: string;

  @Column({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
  license: string;
  @Column()
  phoneNumber: string;
  @Column({ default: false })
  licenseStatus: boolean;
  @Column({ default: false })
  phoneNumberStatus: boolean;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  supplement: string;
}
