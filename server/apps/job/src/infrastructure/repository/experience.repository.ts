import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';
import { ExperienceRepository } from '../../domain/repository';

@Injectable()
export class TypeOrmExperienceRepository extends ExperienceRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {
    super();
  }

  async findAll() {
    return this.experienceRepository.find();
  }
  async findById(id: number): Promise<Experience> {
    return this.experienceRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Experience> {
    return this.experienceRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.experienceRepository.save(createConstTabledto);
  }
}
