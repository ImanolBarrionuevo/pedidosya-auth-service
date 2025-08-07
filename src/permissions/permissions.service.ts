import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionEntity } from '../common/entities/permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/patch-permission.dto';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(PermissionEntity) private permissionsRepository: Repository<PermissionEntity>) { }

    async createPermission(permission: CreatePermissionDto) {
        const newPermission = this.permissionsRepository.create(permission)
        await this.permissionsRepository.insert(newPermission)
        return await this.findPermission(newPermission.id)
    }

    async findAllPermission() {
        const allPermissions = await this.permissionsRepository.find();
        return allPermissions
    }

    async findPermission(id: number) {
        const permission = await this.permissionsRepository.findOne({
            where: { id: id },
        });
        if (!permission) {
            throw new NotFoundException("Permission Not Found");
        }
        return permission
    }

    async updatePermission(id: number, updatePermission: CreatePermissionDto) {
        // Verificamos que el permiso exista
        const permission = await this.findPermission(id);
        Object.assign(permission, updatePermission);
        await this.permissionsRepository.save(permission);
        return permission;
    }

    async partialUpdatePermission(id: number, updatePermission: UpdatePermissionDto) {
        // Verificamos que el permiso exista
        const permission = await this.findPermission(id);
        Object.assign(permission, updatePermission);
        await this.permissionsRepository.save(permission);
        return permission;
    }

    async deletePermission(id: number) {
        await this.permissionsRepository.delete(id);
        return { "message": "deleted" }
    }

}
