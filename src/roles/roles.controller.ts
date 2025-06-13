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

    constructor(private rolesService: RolesService) { }

    @Post()
    @PermissionsDecorator(Permissions.CreateRole)
    postRole(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.createRole(createRoleDto)
    }

    @Get()
    @PermissionsDecorator(Permissions.ReadRole)
    getRoles() {
        return this.rolesService.findRoles()
    }

    @Get(':id')
    @PermissionsDecorator(Permissions.ReadRole)
    getRole(@Param('id') idRole: number) {
        return this.rolesService.findRole(idRole)
    }

    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyRole)
    putRole(@Param('id') idRole: number, @Body() updateRole: CreateRoleDto) {
        return this.rolesService.updateRole(idRole, updateRole)
    }

    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyRole)
    patchRole(@Param('id') idRole: number, @Body() partialUpdateRole: UpdateRoleDto) {
        return this.rolesService.partialUpdateRole(idRole, partialUpdateRole)
    }

    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteRole)
    deleteRole(@Param('id') idRole: number) {
        return this.rolesService.deleteRole(idRole)
    }

}
