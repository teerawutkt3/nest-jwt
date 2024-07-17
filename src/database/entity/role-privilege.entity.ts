import { Base } from 'src/common/entity/base.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Privilege } from './privilege.entity';

@Entity({ name: 'role_privilege' })
export class RolePrivilege extends Base {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ManyToOne(() => Role, (item) => item.code, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'ROLE_CODE' })
  roleCode: string;

  @ManyToOne(() => Privilege, (item) => item.code, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'PRIVILEGE_CODE' })
  privilegeCode: string;
}
