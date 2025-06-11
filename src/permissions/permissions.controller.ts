import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/patch-permission.dto';

@Controller('permissions')
export class PermissionsController {

    constructor(private permissionsService: PermissionsService) { }

    @Post()
    postPermission(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.createPermission(createPermissionDto)
    }

    @Get()
    getPermissions() {
        return this.permissionsService.findPermissions()
    }

    @Get(':id')
    getPermission(@Param('id') idPermission: number) {
        return this.permissionsService.findPermission(idPermission)
    }

    @Put(':id')
    putPermission(@Param('id') idPermission: number, @Body() updatePermission: CreatePermissionDto) {
        return this.permissionsService.updatePermission(idPermission, updatePermission)
    }

    @Patch(':id')
    patchPermission(@Param('id') idPermission: number, @Body() partialUpdatePermission: UpdatePermissionDto) {
        return this.permissionsService.partialUpdatePermission(idPermission, partialUpdatePermission)
    }

    @Delete(':id')
    deletePermission(@Param('id') idPermission: number) {
        return this.permissionsService.deletePermission(idPermission)
    }

}
