import { Base } from 'src/common/entity/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role_user' })
export class RoleUser extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ManyToOne(() => Role, (role) => role.code, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'ROLE_CODE' })
  @Column()
  roleCode: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'USER_ID' })
  @Column()
  userId: number;
}
