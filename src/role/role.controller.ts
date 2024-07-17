import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/initial-role')
  async getInitialRole() {
    await this.roleService.initialRole();
    return 'Initial role success';
  }
}
