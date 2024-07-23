import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CommonResponse } from 'src/common/dto/dto';
import {
  AUTHGUARD_JWT,
  SWAGGER_ACCESS_TOKEN,
} from 'src/common/constant/constants';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard(AUTHGUARD_JWT))
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  async roleAll() {
    const data = await this.roleService.roleAll();
    return new CommonResponse('success', data);
  }

  @Get('/:code')
  @UseGuards(AuthGuard(AUTHGUARD_JWT))
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  async getRoleByCode(@Param('code') code: string) {
    return new CommonResponse(
      'success',
      await this.roleService.getRoleByCode(code),
    );
  }
}
