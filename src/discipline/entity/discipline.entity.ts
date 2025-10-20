import { BaseEntity } from "src/commons/entity/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('BD2_DISCIPLINES')
export class DisciplineEntity extends BaseEntity{

  @PrimaryGeneratedColumn('increment',{ name: 'DISCIPLINE_ID', type: 'number'})
  disciplineId: number;

  @Column({name: 'NAME', type: 'varchar2', length: 100})
  name: string;

  @Column({name: 'DESCRIPTION', type: 'varchar2', length: 255})
  description: string;

  constructor(data: Partial<DisciplineEntity> = {}) {
    super();
    Object.assign(this, data);
  }
} 