import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';
import { CreateCampaignDto } from './dto/Req/createCampaign.dto';
import { UpdateCampaignDto } from './dto/Req/updateCampaign.dto';
import { UpdateCompanyStatusDto } from './dto/Req/updateCompanyStatus.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  createCompany(@Body() data: CreateCompanyDto): Observable<string> {
    return this.companyService.createCompany(data);
  }

  @Get('all')
  getAllCompanies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.companyService.getAllCompanies(page, limit);
  }

  @Get(':id')
  findCompanyById(@Param('id') id: number) {
    return this.companyService.findCompanyById(id);
  }

  @Put('update')
  updateCompany(@Body() data: UpdateCompanyDto): Observable<string> {
    return this.companyService.updateCompany(data);
  }

  @Put('updateStatus')
  updateCompanyStatus(
    @Body() data: UpdateCompanyStatusDto,
  ): Observable<string> {
    return this.companyService.updateCompanyStatus(data);
  }

  @Delete(':id')
  removeCompany(@Param('id') id: number): Observable<string> {
    return this.companyService.removeCompany(id);
  }

  @Post('campaign/create')
  createCampaign(@Body() data: CreateCampaignDto): Observable<string> {
    return this.companyService.createCampaign(data);
  }

  @Get('campaign/all')
  getAllCampaigns(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.companyService.getAllCampaigns(page, limit);
  }

  @Get('campaign/:id')
  findCampaignById(@Param('id') id: number) {
    return this.companyService.findCampaignById(id);
  }

  @Post('campaign/update')
  updateCampaign(@Body() data: UpdateCampaignDto): Observable<string> {
    return this.companyService.updateCampaign(data);
  }

  @Get('campaign/employer/:employerId')
  findCampaignByEmployerId(
    @Param('employerId') employerId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.companyService.findCampaignByEmployerId(
      employerId,
      page,
      limit,
    );
  }

  @Get('campaign/employer/all/:employerId')
  findAllCampaignByEmployerId(@Param('employerId') employerId: string) {
    return this.companyService.findAllCampaignByEmployerId(employerId);
  }

  @Get('field/all')
  getAllField() {
    return this.companyService.getAllField();
  }

  @Get('field/:id')
  findFieldById(@Param('id') id: number) {
    return this.companyService.findFieldById(id);
  }
}
