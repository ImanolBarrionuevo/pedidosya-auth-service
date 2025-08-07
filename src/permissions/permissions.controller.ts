/**
 * Controlador de permisos para la API.
 * Expone endpoints para crear, leer, actualizar y eliminar permisos.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 * Además, se protege con el middleware de autenticación.
 */

import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/patch-permission.dto';
import { UseGuards } from '@nestjs/common';
import { Permissions } from 'src/middlewares/decorators/permissions.enum';
import { PermissionsDecorator } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionsController {

    // Inyecta el servicio de permisos
    constructor(private permissionsService: PermissionsService) { }

    // Crea un nuevo permiso // Permiso: CREATE_PERMISSION
    @Post()
    @PermissionsDecorator(Permissions.CreatePermission)
    postPermission(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.createPermission(createPermissionDto)
    }

    // Obtiene todos los permisos // Permiso: READ_PERMISSION
    @Get()
    @PermissionsDecorator(Permissions.ReadPermission)
    getPermissions() {
        return this.permissionsService.findAllPermission()
    }

    // Obtiene un permiso específico por ID // Permiso: READ_PERMISSION
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadPermission)
    getPermission(@Param('id') idPermission: number) {
        return this.permissionsService.findPermission(idPermission)
    }

    // Actualiza completamente un permiso por ID // Permiso: MODIFY_PERMISSION
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyPermission)
    putPermission(@Param('id') idPermission: number, @Body() updatePermission: CreatePermissionDto) {
        return this.permissionsService.updatePermission(idPermission, updatePermission)
    }

    // Actualiza parcialmente un permiso por ID // Permiso: MODIFY_PERMISSION
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyPermission)
    patchPermission(@Param('id') idPermission: number, @Body() partialUpdatePermission: UpdatePermissionDto) {
        return this.permissionsService.partialUpdatePermission(idPermission, partialUpdatePermission)
    }

    // Elimina un permiso por ID // Permiso: DELETE_PERMISSION
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeletePermission)
    deletePermission(@Param('id') idPermission: number) {
        return this.permissionsService.deletePermission(idPermission)
    }

}
