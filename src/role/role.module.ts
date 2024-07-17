import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/database/entity/role.entity';
import { Privilege } from 'src/database/entity/privilege.entity';
import { RoleUser } from 'src/database/entity/role-user.entity';
import { Menu } from 'src/database/entity/menu.entity';
import { User } from 'src/database/entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Role, Privilege, RoleUser, Menu, User])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
