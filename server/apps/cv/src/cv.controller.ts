// import { Controller } from '@nestjs/common';
// import { CV } from './entities/cv.entity';
// import { CVService } from './cv.service';
// import { MessagePattern } from '@nestjs/microservices';

// @Controller()
// export class CVController {
//   constructor(private readonly cvService: CVService) {}

//   @MessagePattern({ cmd: 'createCV' })
//   async create(cvData: Partial<CV>): Promise<CV> {
//     return this.cvService.create(cvData);
//   }

//   @MessagePattern({ cmd: 'uploadCV' })
//   uploadCV(data: any) {
//     console.log(JSON.stringify(data));
//     return this.cvService.uploadCV(data);
//   }

//   @MessagePattern({ cmd: 'getAllCVs' })
//   async findAll(): Promise<CV[]> {
//     return this.cvService.findAll();
//   }

//   @MessagePattern({ cmd: 'getCVById' })
//   async findOne(id: number): Promise<CV> {
//     return this.cvService.findOne(id);
//   }

//   @MessagePattern({ cmd: 'updateCV' })
//   async update(data: { id: number; cvData: Partial<CV> }): Promise<CV> {
//     return this.cvService.update(data);
//   }

//   @MessagePattern({ cmd: 'deleteCV' })
//   async remove(id: number): Promise<void> {
//     return this.cvService.remove(id);
//   }

//   @MessagePattern({ cmd: 'downloadCV' })
//   async downloadCV(id: number): Promise<any> {
//     return this.cvService.downloadCV(id);
//   }
// }
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CvApplication } from './domain/cv.application';
import { CreateCvDto, UpdateCvDto } from './domain/dto';

@Controller()
export class CvController {
  constructor(private readonly cvApplication: CvApplication) {}

  @MessagePattern({ cmd: 'createCV' })
  createCompany(cv: CreateCvDto) {
    return this.cvApplication.createCv(cv);
  }

  @MessagePattern({ cmd: 'updateCV' })
  async update(cv: UpdateCvDto): Promise<any> {
    return this.cvApplication.updateCv(cv);
  }

  @MessagePattern({ cmd: 'getCVById' })
  async findOne(id: number) {
    return await this.cvApplication.getCv({ id });
  }

  @MessagePattern({ cmd: 'getAllCVs' })
  async findAll() {
    return this.cvApplication.getAllCv();
  }

  @MessagePattern({ cmd: 'deleteCV' })
  async remove(id: number) {
    return this.cvApplication.deleteCv({ id });
  }
}
