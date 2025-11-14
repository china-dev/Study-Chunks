import { Controller, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModuleServiceDelete } from '../service/module.service.delete';

@ApiTags('Modules')
@Controller('modules')
export class ModuleControllerDelete {
  constructor(private readonly moduleServiceDelete: ModuleServiceDelete) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a module' })
  @ApiResponse({
    status: 204,
    description: 'The module has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.moduleServiceDelete.remove(+id);
  }
}
