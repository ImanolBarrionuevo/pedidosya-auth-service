/**
 * Controlador de roles para la API.
 * Expone endpoints para crear, leer, actualizar y eliminar roles.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 * Además, se protege con el middleware de autenticación.
 */

import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/patch-role.dto';
import { UseGuards } from '@nestjs/common';
import { Permissions } from 'src/middlewares/decorators/permissions.enum';
import { PermissionsDecorator } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';


@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {

    // Inyecta el servicio de roles
    constructor(private rolesService: RolesService) { }

    // Crea un nuevo rol // Permiso: CREATE_ROLE
    @Post()
    @PermissionsDecorator(Permissions.CreateRole)
    postRole(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.createRole(createRoleDto)
    }

    // Obtiene todos los roles // Permiso: READ_ROLE
    @Get()
    @PermissionsDecorator(Permissions.ReadRole)
    getRoles() {
        return this.rolesService.findAllRole()
    }

    // Obtiene un rol específico por ID // Permiso: READ_ROLE
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadRole)
    getRole(@Param('id') idRole: number) {
        return this.rolesService.findRole(idRole)
    }

    // Actualiza completamente un rol por ID // Permiso: MODIFY_ROLE
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyRole)
    putRole(@Param('id') idRole: number, @Body() updateRole: CreateRoleDto) {
        return this.rolesService.updateRole(idRole, updateRole)
    }

    // Actualiza parcialmente un rol por ID // Permiso: MODIFY_ROLE
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyRole)
    patchRole(@Param('id') idRole: number, @Body() partialUpdateRole: UpdateRoleDto) {
        return this.rolesService.partialUpdateRole(idRole, partialUpdateRole)
    }

    // Elimina un rol por ID // Permiso: DELETE_ROLE
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteRole)
    deleteRole(@Param('id') idRole: number) {
        return this.rolesService.deleteRole(idRole)
    }

}
