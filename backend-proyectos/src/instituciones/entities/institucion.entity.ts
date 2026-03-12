import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyectos } from 'src/proyectos/entities/proyecto.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiantes.entity';

@Entity('instituciones')
export class Institucion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @OneToMany(() => Proyectos, (proyecto) => proyecto.institucion)
  proyectos: Proyectos[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.institucion)
  estudiantes: Estudiante[];
}
