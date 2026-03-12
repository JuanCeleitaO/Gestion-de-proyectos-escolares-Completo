import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('area')
export class area {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
}
