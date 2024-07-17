import { Base } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'privilege' })
export class Privilege extends Base {
  @ApiProperty()
  @PrimaryColumn({ name: 'CODE' })
  code: string;

  @ApiProperty()
  @Column({ name: 'NAME' })
  name: string;

  @ApiProperty()
  @Column({ name: 'GROUP', length: 50 })
  group: string;

  @ApiProperty()
  @Column({ name: 'RN' })
  rn: number;
}
