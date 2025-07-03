import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/common/entities/permissions.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([PermissionEntity]), UsersModule], // Importamos entidades TypeORM para este módulo.
    controllers: [PermissionsController], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
    providers: [PermissionsService]}) // Definimos el controlador que maneja las rutas HTTP.
export class PermissionsModule {
    
}
 