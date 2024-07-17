import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CommonResponse } from 'src/common/dto/dto';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/initial-role')
  async getInitialRole() {
    await this.roleService.initialRole();
    return new CommonResponse('Initial role success');
  }

  @Get('/all')
  async roleAll() {
    return new CommonResponse('success', await this.roleService.roleAll());
  }

  @Get('/:code')
  async getRoleByCode(@Param('code') code: string) {
    return new CommonResponse(
      'success',
      await this.roleService.getRoleByCode(code),
    );
  }
}
