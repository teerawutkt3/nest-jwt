import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AUTHGUARD_JWT,
  CAN_ACCESS_MENU_LOOKUP,
  SWAGGER_ACCESS_TOKEN,
} from './common/constant/constants';
import { BaseController } from './common/BaseController';

@ApiTags('app')
@UseGuards(AuthGuard(AUTHGUARD_JWT))
@Controller()
export class AppController extends BaseController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {
    super();
  }

  @Get()
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/hello2')
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  getHello2(@Request() req): string {
    this.isPermission(req.user, CAN_ACCESS_MENU_LOOKUP);
    return req.user;
  }
}
