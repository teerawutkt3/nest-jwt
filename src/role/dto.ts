import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  constructor(code: string, name: string, privileges: string[]) {
    this.code = code;
    this.name = name;
    this.privileges = privileges;
  }

  @ApiProperty({ required: false, default: 'ADMIN' })
  code: string;
  name: string;
  privileges: string[] = [];
}

export class PrivilgeDto {
  constructor(roleCode: string, privilegeCode: string) {
    this.roleCode = roleCode;
    this.privilegeCode = privilegeCode;
  }
  roleCode: string;
  privilegeCode: string;
}

export class UserRoleDto {
  roleCodes: string[] = [];
  privilegeCodes: string[] = [];
}
