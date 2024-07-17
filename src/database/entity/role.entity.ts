import { Base } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role' })
export class Role extends Base {
  @ApiProperty()
  @PrimaryColumn({ name: 'CODE' })
  code: string;

  @ApiProperty()
  @Column({ name: 'NAME' })
  name: string;

  @ApiProperty()
  @Column({ name: 'RN' })
  rn: number;
}
