import {
  CreateEmployerDTO,
  UpdateEmployerCompanyDTO,
  UpdateEmployerDTO,
} from '../dto';
import { Employer } from '../entity';

export abstract class EmployerRepository {
  abstract getAllEmployer(page: number, limit: number): Promise<Employer[]>;

  abstract getEmployerById(id: string): Promise<Employer>;

  abstract createEmployer(employer: CreateEmployerDTO): Promise<Employer>;

  abstract getTotalEmployer(): Promise<number>;

  abstract getEmployerByCompanyId(companyId: number): Promise<Employer[]>;

  abstract updateEmployerLincense(
    employerId: string,
    license: string,
    supplement: string,
  ): Promise<Employer>;

  abstract updateEmployerCompany(
    employerCompany: UpdateEmployerCompanyDTO,
  ): Promise<Employer>;

  abstract updateEmployerPhoneStatus(
    id: string,
    phoneNumberStatus: boolean,
  ): Promise<Employer>;

  abstract updateEmployerLicenseStatus(
    id: string,
    licenseStatus: boolean,
  ): Promise<Employer>;

  abstract updateEmployer(data: UpdateEmployerDTO): Promise<Employer>;

  abstract getEmployerByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<Employer[]>;

  abstract getTotalEmployerByName(name: string): Promise<number>;
}
