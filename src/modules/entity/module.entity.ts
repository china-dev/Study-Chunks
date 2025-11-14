import { BaseEntity } from 'src/commons/entity/base.entity';
import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BD2_MODULES')
export class ModuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'MODULE_ID', type: 'number' })
  moduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  @Column({ name: 'DESCRIPTION', type: 'varchar2', length: 255 })
  description: string;

  @ManyToOne(() => DisciplineEntity, (discipline) => discipline.modules)
  @JoinColumn({ name: 'DISCIPLINE_ID' })
  discipline: DisciplineEntity;

  constructor(data: Partial<ModuleEntity> = {}) {
    super();
    Object.assign(this, data);
  }
}
