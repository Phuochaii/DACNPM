import { Job } from '../../entities/job.entity';

export class FindJobRespDTO {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  data: Job[];
}
