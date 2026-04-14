import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyectos } from 'src/proyectos/entities/proyecto.entity';
import { Institucion } from 'src/instituciones/entities/institucion.entity';
@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  identificacion: string;
  @Column()
  grado: string;

  @ManyToOne(() => Proyectos, (proyectos) => proyectos.estudiantes)
  proyecto: Proyectos;
  @ManyToOne(() => Institucion, (institucion) => institucion.estudiantes)
  institucion: Institucion;
}
