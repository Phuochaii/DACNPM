import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post('create')
  createEmployer(@Body() data: CreateEmployerDto): Observable<string> {
    return this.employerService.createEmployer(data);
  }

  @Get('all')
  getAllEmployers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.employerService.getAllEmployers(page, limit);
  }

  @Get(':id')
  findEmployerById(@Param('id') id: string) {
    return this.employerService.findEmployerById(id);
  }

  @Post('update/companyid')
  updateEmployerCompanyId(
    @Body() data: UpdateEmployerCompanyDTO,
  ): Observable<any> {
    return this.employerService.updateEmployerCompanyId(data);
  }

  @Post('update/license')
  updateEmployerLicense(
    @UploadedFile() file: any,
    @Body('employerId') employerId: string,
  ): Observable<any> {
    return this.employerService.updateEmployerLicense(file, employerId);
  }

  @Get('update/licenseStatus/:id')
  updateEmployerLicenseStatus(@Param('id') id: string): Observable<any> {
    return this.employerService.updateEmployerLicenseStatus(id);
  }

  @Get('update/phoneStatus/:id')
  updateEmployerPhoneStatus(@Param('id') id: string): Observable<any> {
    return this.employerService.updateEmployerPhoneStatus(id);
  }

  @Get('position/all')
  getAllPositions(): Observable<string> {
    return this.employerService.getAllPositions();
  }

  @Get('position/:id')
  findPositionById(@Param('id') id: number): Observable<string> {
    return this.employerService.findPositionById(id);
  }
}
