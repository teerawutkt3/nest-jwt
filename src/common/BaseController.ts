import { ForbiddenException } from '@nestjs/common';
import { UserProfile } from './dto/dto';

export class JwtRequest {
  username: string;
  sub: UserProfile;
}

export class BaseController {
  isPermission(req: JwtRequest, privilegeCode: string);
  isPermission(
    req: JwtRequest,
    privilegeCode1: string,
    privilegeCode2?: string,
  );
  isPermission(
    req: JwtRequest,
    privilegeCode1: string,
    privilegeCode2?: string,
  ) {
    const canAccessP1 = req.sub.permission.privileges.includes(privilegeCode1);
    if (!privilegeCode2 && !canAccessP1) {
      throw new ForbiddenException('permission denied');
    }

    const canAccessP2 = req.sub.permission.privileges.includes(privilegeCode2);
    if (!(canAccessP1 || canAccessP2)) {
      throw new ForbiddenException('permission denied');
    }
  }
}
