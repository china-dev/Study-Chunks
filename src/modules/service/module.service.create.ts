import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';
import { CreateModuleDto } from '../dto/create-module.dto';

@Injectable()
export class ModuleServiceCreate {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    const newModule = this.moduleRepository.create(createModuleDto);
    return await this.moduleRepository.save(newModule);
  }
}
