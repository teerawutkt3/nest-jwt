import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SWAGGER_ACCESS_TOKEN } from './common/constant/constants';

@ApiTags('app')
@UseGuards(AuthGuard('jwt'))
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  getHello(): string {
    return this.appService.getHello();
  }
}
