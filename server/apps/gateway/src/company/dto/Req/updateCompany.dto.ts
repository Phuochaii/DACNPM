export class UpdateCompanyDto {
  id: number;
  field: number;
  taxCode: string;
  // name: string;
  website: string;
  image?: string;
  address: string;
  phone: string;
  companySize: number;
  description: string;
}
