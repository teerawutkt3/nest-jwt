import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/BaseController';
import {
  AUTHGUARD_JWT,
  SWAGGER_ACCESS_TOKEN,
} from 'src/common/constant/constants';

@ApiTags('job')
@UseGuards(AuthGuard(AUTHGUARD_JWT))
@Controller('job')
export class JobController extends BaseController {
  @Get('/list')
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  list(): string {
    return 'job list';
  }

  @Post('/create')
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  create(): string {
    return 'job list';
  }

  @Delete('/:id')
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  deelte(): string {
    return 'job list';
  }
}
