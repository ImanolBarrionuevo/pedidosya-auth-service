/**
 * Módulo raíz de la aplicación.
 * Configura la conexión a la base de datos PostgreSQL mediante TypeORM.
 * Registra entidades, controladores y servicios principales.
 * Importa el módulo de autenticación JWT para habilitar la generación y validación de tokens.
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/entities';
import { UsersController } from './users/users.controller';
import { AuthGuard } from './middlewares/auth.middleware';
import { UsersService } from './users/users.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { RolesService } from './roles/roles.service';
import { PermissionsService } from './permissions/permissions.service';
import { JwtAuthModule } from './common/jwt/jwt.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from './common/jwt/jwt.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            database: 'authuser',
            username: 'postgres',
            password: 'postgres',
            synchronize: true,
            entities: entities,
        }),
        TypeOrmModule.forFeature(entities), // Registra entidades para inyección en servicios
        JwtAuthModule // Módulo de autenticación JWT
        //AuthModule,
        //UsersModule,
        //RolesModule,
        //PermissionsModule
    ],
    controllers: [
        AppController,
        UsersController,
        RolesController,
        PermissionsController,
        AuthController
    ],
    providers: [
        AuthGuard, // Guard de autenticación y autorización
        UsersService,
        RolesService,
        PermissionsService,
        AuthService,
        JwtService // Servicio para generación y validación de tokens JWT
    ],
})

export class AppModule { }
