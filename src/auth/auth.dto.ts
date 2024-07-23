import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginRequestDto {
  @ApiProperty({ required: false, default: 'superadmin' })
  username: string;

  @ApiProperty({ required: false, default: 'superadmin' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}
