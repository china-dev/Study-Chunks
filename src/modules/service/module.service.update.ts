import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';
import { UpdateModuleDto } from '../dto/update-module.dto';

@Injectable()
export class ModuleServiceUpdate {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async update(id: number, updateModuleDto: UpdateModuleDto): Promise<ModuleEntity> {
    const module = await this.moduleRepository.preload({
      moduleId: id,
      ...updateModuleDto,
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return this.moduleRepository.save(module);
  }
}
