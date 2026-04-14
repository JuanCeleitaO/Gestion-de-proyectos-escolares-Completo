import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyectos } from 'src/proyectos/entities/proyecto.entity';
@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;

  @OneToMany(() => Proyectos, (proyecto) => proyecto.area)
  proyectos: Proyectos[];
}
