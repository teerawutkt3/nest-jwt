import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, RegisterRequestDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() req: LoginRequestDto) {
    return this.authService.login(req);
  }

  @Post('/register')
  async register(@Body() req: RegisterRequestDto) {
    return this.authService.register(req);
  }
}
