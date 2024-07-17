import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENUS, PRIVILEGES, ROLES } from 'src/common/constant/constants';
import { Menu } from 'src/database/entity/menu.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entity/user.entity';
import { Role } from 'src/database/entity/role.entity';
import { Privilege } from 'src/database/entity/privilege.entity';

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
  ) {}

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
        menuEntity.createdBy = 'SYSTEM';
        menuEntity.rn = menuRn;
        menuRn++;
        await this.menuRepository.save(menuEntity);

        // create sub menu
        for (const subMenu of menu.subMenus) {
          const subMenuEntity = new Menu();
          subMenuEntity.code = subMenu.code;
          subMenuEntity.name = subMenu.name;
          subMenuEntity.parent = subMenu.parent;
          subMenuEntity.createdBy = 'SYSTEM';
          subMenuEntity.rn = subMenuRn;
          subMenuRn++;
          await this.menuRepository.save(subMenuEntity);
        }
        subMenuRn = 1;
      }

      // ==> create user super admin
      const userExist = await this.userRepository.findOne({
        where: { username: 'superadmin' },
      });

      if (!userExist) {
        this.logger.log('create user superadmin ');
        const hashedPassword = await bcrypt.hash('superadmin', 10);
        const user = new User();
        user.username = 'superadmin';
        user.password = hashedPassword;
        user.createdBy = 'SYSTEM';
        await this.userRepository.save(user);
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
        await this.roleRepository.save(role);
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
      }
      this.logger.log('initial role complete');
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
