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
        const allPermissions = await this.permissionsRepository.find({
            relations: ['roles', 'roles.permissions'],
        });
        return allPermissions
    }

    async findPermissions() {
        return this.findAllPermission()
    }

    async findPermission(id: number) {
        const permission = await this.permissionsRepository.findOne({
            where: { id: id },
            relations: ['roles-permissions', 'roles-permissions.roles'],
        });
        if (!permission) {
            throw new NotFoundException("Usuario no encontrado");
        }
        return permission
    }
    async updatePermission(id: number, updatePermission: CreatePermissionDto) {
        await this.permissionsRepository.update(id, updatePermission)
        return this.findPermission(id)
    }

    async partialUpdatePermission(id: number, updatePermission: UpdatePermissionDto) {
        const permission = await this.permissionsRepository.findOne({ where: { id: id } })
        if (!permission) {
            throw new NotFoundException("Usuario no encontrado");
        }

        Object.keys(updatePermission).forEach(column => {
            permission[column] = updatePermission[column];
        })

        await this.permissionsRepository.update(id, permission)
        return permission
    }

    async deletePermission(id: number) {
        await this.permissionsRepository.delete(id);
        return { "message": "deleted" }
    }

}
