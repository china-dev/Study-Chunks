import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModuleServiceUpdate } from '../service/module.service.update';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { ModuleEntity } from '../entity/module.entity';

@ApiTags('Modules')
@Controller('modules')
export class ModuleControllerUpdate {
  constructor(private readonly moduleServiceUpdate: ModuleServiceUpdate) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a module' })
  @ApiResponse({
    status: 200,
    description: 'The module has been successfully updated.',
    type: ModuleEntity,
  })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<ModuleEntity> {
    return await this.moduleServiceUpdate.update(+id, updateModuleDto);
  }
}
