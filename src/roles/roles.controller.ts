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

    // Inyectamos el servicio de roles
    constructor(private rolesService: RolesService) { }

    // Creamos un rol
    @Post()
    @PermissionsDecorator(Permissions.CreateRole)
    postRole(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.createRole(createRoleDto)
    }

    // Obtenemos todos los roles
    @Get()
    @PermissionsDecorator(Permissions.ReadRole)
    getRoles() {
        return this.rolesService.findAllRole()
    }
    
    // Obtenemos un rol especifico
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadRole)
    getRole(@Param('id') idRole: number) {
        return this.rolesService.findRole(idRole)
    }

    // Actualizamos un rol
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyRole)
    putRole(@Param('id') idRole: number, @Body() updateRole: CreateRoleDto) {
        return this.rolesService.updateRole(idRole, updateRole)
    }

    // Actualizamos parcialmente un rol
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyRole)
    patchRole(@Param('id') idRole: number, @Body() partialUpdateRole: UpdateRoleDto) {
        return this.rolesService.partialUpdateRole(idRole, partialUpdateRole)
    }

    // Eliminamos un rol por id
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteRole)
    deleteRole(@Param('id') idRole: number) {
        return this.rolesService.deleteRole(idRole)
    }

}
