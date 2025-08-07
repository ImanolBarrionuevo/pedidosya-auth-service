/**
 * Servicio de permisos para la API.
 * Administra operaciones CRUD sobre la entidad PermissionEntity,
 * incluyendo creación, lectura, actualización total o parcial, y eliminación.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionEntity } from '../common/entities/permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/patch-permission.dto';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(PermissionEntity) private permissionsRepository: Repository<PermissionEntity>) { }

    // Crea un nuevo permiso
    async createPermission(permission: CreatePermissionDto) {
        const newPermission = this.permissionsRepository.create(permission)
        await this.permissionsRepository.insert(newPermission)
        return await this.findPermission(newPermission.id)
    }

    // Obtiene todos los permisos
    async findAllPermission() {
        const allPermissions = await this.permissionsRepository.find();
        return allPermissions
    }

    // Busca un permiso por su ID
    async findPermission(id: number) {
        const permission = await this.permissionsRepository.findOne({
            where: { id: id },
        });
        if (!permission) {
            throw new NotFoundException("Permission Not Found");
        }
        return permission
    }

    // Actualiza completamente un permiso por su ID
    async updatePermission(id: number, updatePermission: CreatePermissionDto) {
        const permission = await this.findPermission(id); // Verifica que exista el permiso
        Object.assign(permission, updatePermission); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        await this.permissionsRepository.save(permission);
        return permission;
    }

    // Actualiza parcialmente un permiso por su ID
    async partialUpdatePermission(id: number, updatePermission: UpdatePermissionDto) {
        const permission = await this.findPermission(id); // Verifica que exista el permiso
        Object.assign(permission, updatePermission); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        await this.permissionsRepository.save(permission);
        return permission;
    }

    // Elimina un permiso por su ID
    async deletePermission(id: number) {
        await this.permissionsRepository.delete(id);
        return { "message": "deleted" }
    }

}
