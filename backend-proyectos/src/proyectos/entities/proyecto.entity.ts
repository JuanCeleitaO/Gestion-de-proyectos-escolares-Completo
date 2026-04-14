import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiantes.entity';
import { instituciones } from 'src/instituciones/entities/institucion.entity';
import { Area } from 'src/areas/entities/areas.entity';
@Entity('proyectos')
export class Proyectos {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  titulo: string;

  @Column()
  objetivo: string;
  @Column()
  presupuesto: number;
  @Column({ type: 'text' })
  observaciones: string;
  @Column({ type: 'date' })
  fecha_inicio: Date;
  @Column({ type: 'date' })
  fecha_fin: Date;

  @OneToMany(() => Estudiante, (Estudiante) => Estudiante.proyecto)
  estudiantes: Estudiante[];
  @ManyToOne(() => instituciones, (instituciones) => instituciones.proyectos)
  institucion: instituciones;
  @ManyToOne(() => Area, (Area) => Area.proyectos)
  area: Area;
}
