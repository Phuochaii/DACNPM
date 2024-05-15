import { CreateCampaignDTO, UpdateCampaignDTO } from './dto';
import { Campaign } from './entity';
import {
  CreateCampaignService,
  FindCampaignByIdService,
  GetAllCampaignByEmployerIdPaginationService,
  GetAllCampaignByEmployerIdService,
  GetAllCampaignPaginationService,
  GetTotalCampaignByEmployerIdService,
  GetTotalCampaignsService,
  UpdateCampaignService,
} from './service';

export class CampaignApplication {
  constructor(
    private readonly createCampaignService: CreateCampaignService,
    private readonly getAllCampaignPaginationService: GetAllCampaignPaginationService,
    private readonly getTotalCampaignsService: GetTotalCampaignsService,
    private readonly findCampaignByIdService: FindCampaignByIdService,
    private readonly updateCampaignService: UpdateCampaignService,
    private readonly getAllCampaignByEmployerIdService: GetAllCampaignByEmployerIdService,
    private readonly getAllCampaignByEmplyerIdPaginationService: GetAllCampaignByEmployerIdPaginationService,
    private readonly getTotalCampaignByEmployerIdService: GetTotalCampaignByEmployerIdService,
  ) {}

  async createCampaign(request: CreateCampaignDTO): Promise<Campaign> {
    return await this.createCampaignService.execute(request);
  }

  async getAllCampaignPagination(
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    return await this.getAllCampaignPaginationService.execute(page, limit);
  }

  async getTotalCampaigns(): Promise<number> {
    return await this.getTotalCampaignsService.execute();
  }

  async findCampaignById(id: number): Promise<Campaign> {
    return await this.findCampaignByIdService.execute(id);
  }

  async updateCampaign(campaign: UpdateCampaignDTO): Promise<Campaign> {
    return await this.updateCampaignService.execute(campaign);
  }

  async getAllCampaignByEmployerId(employerId: number): Promise<Campaign[]> {
    return await this.getAllCampaignByEmployerIdService.execute(employerId);
  }

  async getAllCampaignByEmployerIdPagination(
    employerId: number,
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    return await this.getAllCampaignByEmplyerIdPaginationService.execute(
      employerId,
      page,
      limit,
    );
  }

  async getTotalCampaignByEmployerId(employerId: number): Promise<number> {
    return await this.getTotalCampaignByEmployerIdService.execute(employerId);
  }
}
