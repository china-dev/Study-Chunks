import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModuleServiceFindAll } from '../service/module.service.findAll';
import { ModuleEntity } from '../entity/module.entity';

@ApiTags('Modules')
@Controller('modules')
export class ModuleControllerFindAll {
  constructor(private readonly moduleServiceFindAll: ModuleServiceFindAll) {}

  @Get()
  @ApiOperation({ summary: 'List all modules' })
  @ApiResponse({
    status: 200,
    description: 'Return all modules.',
    type: [ModuleEntity],
  })
  async findAll(): Promise<ModuleEntity[]> {
    return await this.moduleServiceFindAll.findAll();
  }
}
