import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base extends BaseEntity {
  @Column({ name: 'CREATED_BY', nullable: false })
  createdBy: string = 'SYSTEM';

  @Column({ name: 'UPDATED_BY', nullable: true })
  updatedBy: string;

  @CreateDateColumn({ name: 'CREATED_DATE', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'UPDATED_DATE', nullable: true })
  updatedDate: Date;

  @Column({ name: 'IS_DELETED', default: 'N', nullable: false })
  isDeleted: string;
}
