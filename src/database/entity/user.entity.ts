import { Base } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'user' })
export class User extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ApiProperty()
  @Column({ name: 'USERNAME', unique: true })
  username: string;

  @ApiProperty()
  @Column({ name: 'PASSWORD' })
  password: string;
}
