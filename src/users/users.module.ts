import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/users.entity';
import { UsersService } from './users.service';
import { JwtAuthModule } from '../common/jwt/jwt.module';
import { RoleEntity } from 'src/common/entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]), // Importamos entidades TypeORM para este módulo.
    JwtAuthModule // Importamos el modulo de autenticacion JWT
],
  providers: [UsersService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  exports: [UsersService], //  Definimos el controlador que maneja las rutas HTTP.
})
export class UsersModule {}
