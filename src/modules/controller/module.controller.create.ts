import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateModuleDto } from '../dto/create-module.dto';
import { ModuleServiceCreate } from '../service/module.service.create';
import { ModuleEntity } from '../entity/module.entity';

@ApiTags('Modules')
@Controller('modules')
export class ModuleControllerCreate {
  constructor(private readonly moduleServiceCreate: ModuleServiceCreate) {}

  @Post()
  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({
    status: 201,
    description: 'The module has been successfully created.',
    type: ModuleEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    return await this.moduleServiceCreate.create(createModuleDto);
  }
}
