import { BaseEntity } from 'src/commons/entity/base.entity';
import { ModuleEntity } from 'src/modules/entity/module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BD2_SUBMODULES')
export class SubmoduleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'SUBMODULE_ID', type: 'number' })
  submoduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  @Column({ name: 'EXPLANATION', type: 'text' })
  explanation: string;

  @ManyToOne(() => ModuleEntity, (module) => module.submodules)
  @JoinColumn({ name: 'MODULE_ID' })
  module: ModuleEntity;

  constructor(data: Partial<SubmoduleEntity> = {}) {
    super();
    Object.assign(this, data);
  }
}
