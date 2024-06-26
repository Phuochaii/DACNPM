import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  CampaignApplication,
  CompanyApplication,
  FieldApplication,
} from './domain';
import {
  CreateCampaignDTO,
  CreateCompanyDTO,
  UpdateCampaignDTO,
  UpdateCompanyDTO,
  UpdateCompanyStatusDTO,
} from './domain/dto';

@Controller()
export class CompanyServiceController {
  constructor(
    private readonly companyApplication: CompanyApplication,
    private readonly campaignApplication: CampaignApplication,
    private readonly fieldApplication: FieldApplication,
  ) {}

  @MessagePattern({ cmd: 'create_company' })
  createCompany(company: CreateCompanyDTO) {
    return this.companyApplication.createCompany(company);
  }

  @MessagePattern({ cmd: 'get_all_companies' })
  async findAllCompanies(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);
    const total = await this.companyApplication.getTotalCompanies();
    const total_page = Math.ceil(total / limit);
    const data_find = await this.companyApplication.getAllCompanyPagination(
      page,
      limit,
    );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_company_by_id' })
  async findCompanyById(id: number) {
    const company = await this.companyApplication.findCompanyById(id);

    if (company) {
      const field = await this.fieldApplication.findFieldById(company.field);

      if (field) {
        const companyWithFieldName = {
          ...company,
          fieldName: field.name,
        };

        return companyWithFieldName;
      } else {
        throw new RpcException(new BadRequestException('Field is not exist'));
      }
    } else {
      throw new RpcException(new BadRequestException('Company is not exist'));
    }
  }

  @MessagePattern({ cmd: 'update_company' })
  async updateCompany(data: UpdateCompanyDTO) {
    const company = await this.companyApplication.updateCompany(data);

    if (company) {
      return company;
    } else {
      throw new RpcException(new BadRequestException('Company is not exist'));
    }
  }

  @MessagePattern({ cmd: 'update_company_status' })
  async updateCompanyStatus(data: UpdateCompanyStatusDTO) {
    const company = await this.companyApplication.updateCompanyStatus(data);

    if (company) {
      return company;
    } else {
      throw new RpcException(new BadRequestException('Company is not exist'));
    }
  }

  @MessagePattern({ cmd: 'remove_company' })
  removeCompany(id: number) {
    return this.companyApplication.removeCompany(id);
  }

  @MessagePattern({ cmd: 'find_company_by_array_id' })
  async findCompanyByArrayId(id: number[]) {
    return await this.companyApplication.findCompanyByArrayId(id);
  }

  @MessagePattern({ cmd: 'find_company_by_name' })
  async findCompanyByNameId(@Payload() data: any) {
    const name = String(data.name);
    const page = Number(data.page);
    const limit = Number(data.limit);

    const companies = await this.companyApplication.findCompanyByName(
      name,
      page,
      limit,
    );

    if (companies.length <= 0) {
      throw new RpcException(new BadRequestException('Cannot found company'));
    } else {
      const total = await this.companyApplication.getTotalCompanyByName(name);
      const total_page = Math.ceil(total / limit);

      const result = {
        page: page,
        limit: limit,
        total: total,
        total_page: total_page,
        data: companies,
      };

      return result;
    }
  }

  @MessagePattern({ cmd: 'create_campaign' })
  createCampaign(campaign: CreateCampaignDTO) {
    return this.campaignApplication.createCampaign(campaign);
  }

  @MessagePattern({ cmd: 'get_all_campaigns' })
  async findAllCampaign(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);
    const total = await this.campaignApplication.getTotalCampaigns();
    const total_page = Math.ceil(total / limit);
    const data_find = await this.campaignApplication.getAllCampaignPagination(
      page,
      limit,
    );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_campaign_by_id' })
  async findCampaignById(id: number) {
    const campaign = await this.campaignApplication.findCampaignById(id);

    if (campaign) {
      return campaign;
    } else {
      throw new RpcException(
        new BadRequestException('CampaignId is not exist'),
      );
    }
  }

  @MessagePattern({ cmd: 'update_campaign' })
  async updateCampaign(data: UpdateCampaignDTO) {
    const campaign = await this.campaignApplication.updateCampaign(data);

    if (campaign) {
      return campaign;
    } else {
      throw new RpcException(new BadRequestException('Campaign is not exist'));
    }
  }

  @MessagePattern({ cmd: 'find_campaign_by_employerId' })
  async findCampaignByEmployerId(@Payload() data: any) {
    const employerId = String(data.employerId);
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(
      await this.campaignApplication.getTotalCampaignByEmployerId(employerId),
    );
    const total_page = Math.ceil(total / limit);

    const data_find =
      await this.campaignApplication.getAllCampaignByEmployerIdPagination(
        employerId,
        page,
        limit,
      );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_all_campaign_by_employerid' })
  async findAllCampaignByEmployerId(employerId: string) {
    const campaign =
      await this.campaignApplication.getAllCampaignByEmployerId(employerId);

    const result = {
      data: campaign,
    };

    return result;
  }

  @MessagePattern({ cmd: 'delete_campaign' })
  async DeleteCampaignService(id: number) {
    const result = await this.campaignApplication.deleteCampaign(id);
    if (result === 'Delete Campaign Success') {
      return result;
    } else {
      throw new RpcException(new BadRequestException('Campaign is not exist'));
    }
  }

  @MessagePattern({ cmd: 'find_campaign_by_name' })
  async findCampaignByNameId(@Payload() data: any) {
    const name = String(data.name);
    const page = Number(data.page);
    const limit = Number(data.limit);

    const campaigns = await this.campaignApplication.findCampaignByName(
      name,
      page,
      limit,
    );

    if (campaigns.length <= 0) {
      throw new RpcException(new BadRequestException('Cannot found campaign'));
    } else {
      const total = await this.campaignApplication.getTotalCampaignByName(name);
      const total_page = Math.ceil(total / limit);

      const result = {
        page: page,
        limit: limit,
        total: total,
        total_page: total_page,
        data: campaigns,
      };

      return result;
    }
  }

  @MessagePattern({ cmd: 'get_all_field' })
  getAllField() {
    return this.fieldApplication.getAllField();
  }

  @MessagePattern({ cmd: 'find_field_by_id' })
  findFieldById(id: number) {
    return this.fieldApplication.findFieldById(id);
  }
}
