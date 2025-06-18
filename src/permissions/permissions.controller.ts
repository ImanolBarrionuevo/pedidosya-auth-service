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

    constructor(private permissionsService: PermissionsService) { }

    @Post()
    @PermissionsDecorator(Permissions.CreatePermission)
    postPermission(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.createPermission(createPermissionDto)
    }

    @Get()
    @PermissionsDecorator(Permissions.ReadPermission)
    getPermissions() {
        return this.permissionsService.findAllPermission()
    }

    @Get(':id')
    @PermissionsDecorator(Permissions.ReadPermission)
    getPermission(@Param('id') idPermission: number) {
        return this.permissionsService.findPermission(idPermission)
    }

    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyPermission)
    putPermission(@Param('id') idPermission: number, @Body() updatePermission: CreatePermissionDto) {
        return this.permissionsService.updatePermission(idPermission, updatePermission)
    }

    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyPermission)
    patchPermission(@Param('id') idPermission: number, @Body() partialUpdatePermission: UpdatePermissionDto) {
        return this.permissionsService.partialUpdatePermission(idPermission, partialUpdatePermission)
    }

    @Delete(':id')
    @PermissionsDecorator(Permissions.DeletePermission)
    deletePermission(@Param('id') idPermission: number) {
        return this.permissionsService.deletePermission(idPermission)
    }

}
