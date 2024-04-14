import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from '../entities/major.entity';
import { CreateMajorDto } from '../dto/Req/createMajor.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  async findAll(): Promise<Major[]> {
    return this.majorRepository.find();
  }

  async create(major: CreateMajorDto): Promise<Major | string> {
    const _major = await this.majorRepository.findOne({
      where: { name: major.name },
    });
    if (_major) {
      throw new RpcException('The major is already exists.');
    }
    return this.majorRepository.save(major);
  }
}