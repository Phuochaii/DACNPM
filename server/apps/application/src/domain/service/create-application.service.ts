import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
// import { ApplicationDto } from '../dto';

export class CreateApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application> {
    const createdApplication =
      await this.applicationRepository.createApplication(ApplicationDto);
    return createdApplication;
  }
}
