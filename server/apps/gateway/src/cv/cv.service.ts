import { Inject, Injectable } from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { CVDto } from './dto/cv.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CVService {
  constructor(
    @Inject('CV') private readonly cvClient: ClientProxy,
    private readonly uploadService: UploadService,
  ) {}

  getHello(): Observable<any> {
    return this.cvClient.send({ cmd: 'hello' }, {});
  }

  getAllCVs(): Observable<any> {
    return this.cvClient.send({ cmd: 'getAllCVs' }, {});
  }

  getCVById(id: number): Observable<any> {
    return this.cvClient.send({ cmd: 'getCVById' }, id);
  }

  createCV(cvDto: CVDto): Observable<any> {
    return this.cvClient.send({ cmd: 'createCV' }, cvDto);
  }

  uploadCV(file: any, userId: number): Observable<any> {
    const uploadLink$ = from(this.uploadService.uploadCV(file));
    return uploadLink$.pipe(
      switchMap((link: string) =>
        this.cvClient.send({ cmd: 'uploadCV' }, { file, userId, link }),
      ),
    );
  }

  updateCV(id: number, cvDto: CVDto): Observable<any> {
    return this.cvClient.send({ cmd: 'updateCV' }, { id, cvDto });
  }

  deleteCV(id: number): Observable<any> {
    return this.cvClient.send({ cmd: 'deleteCV' }, id);
  }

  downloadCV(id: number): Observable<any> {
    return this.cvClient.send({ cmd: 'downloadCV' }, id);
  }
}
