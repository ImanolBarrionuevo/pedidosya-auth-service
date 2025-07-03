import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/common/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from 'src/common/jwt/jwt.module';
import { RoleEntity } from 'src/common/entities/roles.entity';
import { JwtService } from 'src/common/jwt/jwt.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity, RoleEntity]), // Importamos entidades TypeORM para este módulo.
    UsersModule, // Importamos UsersModule para búsqueda y validación de usuarios.
    JwtAuthModule // Importamos el modulo de autenticacion JWT.
  ],
  controllers: [AuthController], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  providers: [AuthService, JwtService], // Definimos los controladores de autenticacion
})
export class AuthModule {}
