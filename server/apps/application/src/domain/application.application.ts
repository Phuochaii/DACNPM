import {
  CreateApplicationDto,
  GetApplicationByIdDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdWithPaginationDto,
  GetByCampaignIdDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
  DeleteByCampaignIdDto,
} from './dto';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
  UpdateApplicationService,
  GetByCampaignIdWithPaginationService,
  GetByCampaignIdService,
  GetByUserIdApplicationService,
  GetByUserIdPaginationApplicationService,
  DelApplicationService,
} from './service';
import { Application } from './entity';
import { RpcException } from '@nestjs/microservices';
import { Applications } from '@app/common/proto/application';

export class ApplicationDomain {
  constructor(
    private readonly createApplicationService: CreateApplicationService,
    private readonly getApplicationService: GetApplicationService,
    private readonly getAllApplicationService: GetAllApplicationService,
    private readonly getByCampaignIdWithPaginationService: GetByCampaignIdWithPaginationService,
    private readonly updateApplicationService: UpdateApplicationService,
    private readonly getAllByCampaignIdApplicationService: GetByCampaignIdService,
    private readonly getByUserIdApplicationService: GetByUserIdApplicationService,
    private readonly getByUserIdPagiantionApplicationService: GetByUserIdPaginationApplicationService,
    private readonly delApplicationService: DelApplicationService,
  ) {}

  async createApplication(request: CreateApplicationDto): Promise<Application> {
    return await this.createApplicationService.execute(request);
  }

  async getApplication(
    request: GetApplicationByIdDto,
  ): Promise<Application | null> {
    const data = await this.getApplicationService.execute(request);
    if (!data) {
      throw new RpcException(`Id doesn't exist!`);
    }
    return data;
  }

  async getAllApplication(
    request: GetAllApplicationsDto,
  ): Promise<Application[]> {
    return await this.getAllApplicationService.execute(request);
  }

  async getByCampaignIdApplication(
    request: GetByCampaignIdWithPaginationDto,
  ): Promise<Applications> {
    const campaignIds = request.campaignIds;
    const total_data = this.getAllByCampaignIdApplication({
      campaignIds,
    });

    const total = (await total_data).length;
    const data =
      await this.getByCampaignIdWithPaginationService.execute(request);
    const total1 = (await data).length;

    const total_pages = Math.ceil(total / request.limit);
    if (!total_data || !data) {
      return {
        page: request.page,
        limit: request.limit,
        total: total1,
        totalPage: total_pages,
        applications: [],
      };
    }
    return {
      page: request.page,
      limit: request.limit,
      total: total1,
      totalPage: total_pages,
      applications: data,
    };
    // return await this.getByCampaignIdApplicationService.execute(request);
  }

  async getAllByCampaignIdApplication(
    request: GetByCampaignIdDto,
  ): Promise<Application[]> {
    return await this.getAllByCampaignIdApplicationService.execute(request);
  }

  async updateApplication(request: UpdateApplicationDto) {
    const result = await this.updateApplicationService.execute(request);
    if (!result) {
      throw new RpcException(`Id doesn't exist!`);
    }
    return result;
  }

  async getByUserIdApplication(
    request: GetByUserIdApplicationDto,
  ): Promise<Application[]> {
    return await this.getByUserIdApplicationService.execute(request);
  }

  async getByUserIdPaginationApplication(
    request: GetByUserIdPaginationApplicationDto,
  ): Promise<Applications> {
    const userId = request.userId;
    const status = request.status;
    const total_data = await this.getByUserIdApplication({
      userId,
      status,
    });

    if (!total_data) {
      throw new RpcException(`Id doesn't exist!`);
    }
    const total = total_data.length;
    const data =
      await this.getByUserIdPagiantionApplicationService.execute(request);

    if (!data) {
      throw new RpcException(`Id doesn't exist!`);
    }
    const total_pages = Math.ceil(total / request.limit);
    return {
      page: request.page,
      limit: request.limit,
      total: total,
      totalPage: total_pages,
      applications: data,
    };
    // return await this.getByUserIdPagiantionApplicationService.execute(request);
  }

  async delApplicationbyCampaign(request: DeleteByCampaignIdDto) {
    return await this.delApplicationService.execute(request);
  }
}
