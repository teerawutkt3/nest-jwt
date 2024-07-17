import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginRequestDto {
  @ApiProperty({ required: false, default: 'admin' })
  username: string;

  @ApiProperty({ required: false, default: 'admin' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}
