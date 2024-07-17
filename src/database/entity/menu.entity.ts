import { Base } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'menu' })
export class Menu extends Base {
  @ApiProperty()
  @PrimaryColumn({ name: 'CODE' })
  code: string;

  @ApiProperty()
  @Column({ name: 'NAME', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ name: 'PARENT', nullable: true })
  parent: string;

  @ApiProperty()
  @Column({ name: 'RN' })
  rn: number;
}
