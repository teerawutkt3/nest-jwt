import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entity/user.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(req: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log('login req: ', JSON.stringify(req));

    const user = await this.usersService.findOne(req.username);
    const roles = await this.roleService.getRoleByUserId(user.id);

    const sub = {
      username: req.username,
      roles: roles,
    };
    const payload = { username: req.username, sub: sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(req: RegisterRequestDto): Promise<void> {
    this.logger.log('req: ', JSON.stringify(req));
    const existingUser = await this.usersService.findByUsername(req.username);
    if (existingUser) {
      const msg = 'user already exists';
      this.logger.log(msg);
      throw new BadRequestException(msg);
    }

    await this.usersService.create(req);
  }
}
