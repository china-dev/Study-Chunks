import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModuleServiceFindOne } from '../service/module.service.findOne';
import { ModuleEntity } from '../entity/module.entity';

@ApiTags('Modules')
@Controller('modules')
export class ModuleControllerFindOne {
  constructor(private readonly moduleServiceFindOne: ModuleServiceFindOne) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a module by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the module.',
    type: ModuleEntity,
  })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  async findOne(@Param('id') id: string): Promise<ModuleEntity> {
    return await this.moduleServiceFindOne.findOne(+id);
  }
}
