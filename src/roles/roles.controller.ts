import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/patch-role.dto';


@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) { }

    @Post()
    postRole(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.createRole(createRoleDto)
    }

    @Get()
    getRoles() {
        return this.rolesService.findRoles()
    }

    @Get(':id')
    getRole(@Param('id') idRole: number) {
        return this.rolesService.findRole(idRole)
    }

    @Put(':id')
    putRole(@Param('id') idRole: number, @Body() updateRole: CreateRoleDto) {
        return this.rolesService.updateRole(idRole, updateRole)
    }

    @Patch(':id')
    patchRole(@Param('id') idRole: number, @Body() partialUpdateRole: UpdateRoleDto) {
        return this.rolesService.partialUpdateRole(idRole, partialUpdateRole)
    }

    @Delete(':id')
    deleteRole(@Param('id') idRole: number) {
        return this.rolesService.deleteRole(idRole)
    }

}
