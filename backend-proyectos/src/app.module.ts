import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosController } from './proyectos/proyectos.controller';
import { ProyectosService } from './proyectos/proyectos.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'juancho25',
      database: 'gestion_proyectos_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, ProyectosController],
  providers: [AppService, ProyectosService],
})
export class AppModule {}
