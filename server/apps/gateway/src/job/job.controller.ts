import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('all')
  getAllJobs(): Observable<string> {
    return this.jobService.getAllJobs();
  }

  @Get('valid-jobs')
  getValidJobs(): Observable<string> {
    return this.jobService.getValidJobs();
  }

  @Post('create')
  createJob(@Body() data: CreateJobDto): Observable<string> {
    return this.jobService.createJob(data);
  }

  @Get(':id')
  findJobById(@Param('id') id: number): Observable<string> {
    return this.jobService.findJobById(id);
  }
}
