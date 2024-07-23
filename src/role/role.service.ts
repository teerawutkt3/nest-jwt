import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MENUS,
  PRIVILEGES,
  ROLE_SUPER_ADMIN,
  ROLES,
} from 'src/common/constant/constants';
import { Menu } from 'src/database/entity/menu.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entity/user.entity';
import { Role } from 'src/database/entity/role.entity';
import { Privilege } from 'src/database/entity/privilege.entity';
import { RolePrivilege } from 'src/database/entity/role-privilege.entity';
import { RoleUser } from 'src/database/entity/role-user.entity';
import { RoleResponseDto } from './role.dto';
import { Permission } from 'src/common/dto/dto';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Privilege)
    private privilegeRepository: Repository<Privilege>,

    @InjectRepository(RolePrivilege)
    private rolePrivilegeRepository: Repository<RolePrivilege>,

    @InjectRepository(RoleUser)
    private roleUserRepository: Repository<RoleUser>,
  ) {}

  async roleAll(): Promise<RoleResponseDto[]> {
    const roleList = await this.roleRepository.find({
      where: { isDeleted: 'N' },
    });
    return roleList.map((it) => {
      return new RoleResponseDto(it.code, it.name, []);
    });
  }

  async getRoleByCode(code: string): Promise<RoleResponseDto> {
    this.logger.log('getRoleByCode code: ', code);
    const role = await this.roleRepository.findOne({
      where: { code: code, isDeleted: 'N' },
    });
    this.logger.log('role: ', JSON.stringify(role));
    const privilegeList = await this.rolePrivilegeRepository.find({
      where: { roleCode: code, isDeleted: 'N' },
    });

    this.logger.log('privilegeList size: ', privilegeList.length);
    const privilegeCodeList = privilegeList.map((it) => it.privilegeCode);
    return new RoleResponseDto(role.code, role.name, privilegeCodeList);
  }

  async getRoleByUserId(userId: number): Promise<Permission> {
    this.logger.log('getRoleByUserId userId: ', userId);
    // ==> get role list
    const roleUserList = await this.roleUserRepository.find({
      where: { userId: userId, isDeleted: 'N' },
    });

    // ==> get privilege list
    const permission = new Permission();
    const privilegs = [];
    for (const roleUser of roleUserList) {
      const privilegeList = await this.rolePrivilegeRepository.find({
        where: { roleCode: roleUser.roleCode, isDeleted: 'N' },
      });

      const privilegeCodeList = privilegeList.map((it) => it.privilegeCode);
      privilegs.push(...privilegeCodeList);
    }

    permission.roles = roleUserList.map((it) => it.roleCode);
    permission.privileges = [...new Set(privilegs)];
    return permission;
  }

  async initialRole(): Promise<void> {
    try {
      this.logger.log('initial role...');

      // ==> create menu and sub menu
      let menuRn = 1;
      let subMenuRn = 1;
      this.logger.log('create menu');
      for (const menu of MENUS) {
        const menuEntity = new Menu();
        menuEntity.code = menu.menu;
        menuEntity.name = menu.name;
        menuEntity.parent = null;
        menuEntity.rn = menuRn;
        menuRn++;
        await this.menuRepository.save(menuEntity);

        // create sub menu
        for (const subMenu of menu.subMenus) {
          const subMenuEntity = new Menu();
          subMenuEntity.code = subMenu.code;
          subMenuEntity.name = subMenu.name;
          subMenuEntity.parent = subMenu.parent;
          subMenuEntity.rn = subMenuRn;
          subMenuRn++;
          await this.menuRepository.save(subMenuEntity);
        }
        subMenuRn = 1;
      }

      const username = 'superadmin';
      const password = 'superadmin';

      // ==> create user super admin
      let user = await this.userRepository.findOne({
        where: { username: username },
      });

      if (!user) {
        this.logger.log('create user superadmin ');
        const hashedPassword = await bcrypt.hash(password, 10);
        const userEntity = new User();
        userEntity.username = username;
        userEntity.password = hashedPassword;
        user = await this.userRepository.save(userEntity);
      }

      // ==> create role
      this.logger.log('create role ');
      let roleRn = 1;
      for (const role of ROLES) {
        const roleEntity = new Role();
        roleEntity.code = role.code;
        roleEntity.name = role.name;
        roleEntity.rn = roleRn;
        roleRn++;
        await this.roleRepository.save(roleEntity);
      }

      // ==> create role user
      this.logger.log('map role user ');
      const existRoleUser = await this.roleUserRepository.findOne({
        where: { roleCode: ROLE_SUPER_ADMIN, userId: user.id },
      });

      if (!existRoleUser) {
        const roleUserEntity = new RoleUser();
        roleUserEntity.roleCode = ROLE_SUPER_ADMIN;
        roleUserEntity.userId = user.id;
        await this.roleUserRepository.save(roleUserEntity);
      }

      // ==> create privilege
      this.logger.log('create privilege ');
      let privilegeRn = 1;
      for (const privilege of PRIVILEGES) {
        const privilegeEntity = new Privilege();
        privilegeEntity.code = privilege.code;
        privilegeEntity.name = privilege.name;
        privilegeEntity.group = privilege.group;
        privilegeEntity.rn = privilegeRn;
        privilegeRn++;
        await this.privilegeRepository.save(privilegeEntity);

        // ==> map role & privilege
        this.logger.log('map role & privilege ');
        const existRolePrivilege = await this.rolePrivilegeRepository.findOne({
          where: {
            roleCode: ROLE_SUPER_ADMIN,
            privilegeCode: privilege.code,
            isDeleted: 'N',
          },
        });
        this.logger.log('existRolePrivilege: ', !existRolePrivilege);
        if (!existRolePrivilege) {
          const rolePrivilegeEntity = new RolePrivilege();
          rolePrivilegeEntity.roleCode = ROLE_SUPER_ADMIN;
          rolePrivilegeEntity.privilegeCode = privilege.code;
          this.rolePrivilegeRepository.save(rolePrivilegeEntity);
        }
      }

      this.logger.log('initial role complete');
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
