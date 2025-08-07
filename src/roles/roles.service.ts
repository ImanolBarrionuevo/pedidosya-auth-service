/**
 * Servicio de roles para la API.
 * Gestiona operaciones relacionadas con la entidad RoleEntity, incluyendo creación, lectura, actualización y eliminación.
 * También maneja la asignación de permisos mediante el servicio de permisos.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntity } from '../common/entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/patch-role.dto';
import { PermissionEntity } from 'src/common/entities/permissions.entity';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>,
        private permissionsService: PermissionsService,
    ) { }

    // Crea un nuevo rol con sus permisos asociados
    async createRole(createRoleDto: CreateRoleDto) {
        const role = this.rolesRepository.create({
            name: createRoleDto.name,
        });

        // Asocia los permisos si se proporcionan
        if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
            for (const permissionId of createRoleDto.permissionIds) {
                const permission = await this.permissionsService.findPermission(permissionId);
                role.permissions.push(permission);
            }
        }

        await this.rolesRepository.save(role);
        return role;
    }

    // Obtiene todos los roles con sus permisos
    async findAllRole() {
        const allRoles = await this.rolesRepository.find({
            relations: ['permissions'], // Con sus permisos relacionados
        });
        return allRoles
    }

    // Obtiene un rol por ID
    async findRole(id: number) {
        const role = await this.rolesRepository.findOne({
            where: { id: id },
        });
        if (!role) {
            throw new NotFoundException("Role Not Found");
        }
        return role
    }

    // Actualiza completamente un rol por su ID, asignando permisos
    async updateRole(id: number, updateRole: CreateRoleDto) {

        const role = await this.findRole(id); // Verifica que exista el rol
        Object.assign(role, updateRole); // Actualiza las propiedades simples (no objetos) que el DTO puede tener
        const permissionsEntities: PermissionEntity[] = []; // Array de entidades PermissionEntity

        // Recorre cada ID proporcionado en el DTO
        for (const id of updateRole.permissionIds) {
            const permissionEntity = await this.permissionsService.findPermission(id);
            permissionsEntities.push(permissionEntity);
        }

        role.permissions = permissionsEntities; // Asigna al rol al array de entidades encontradas

        await this.rolesRepository.save(role);
        return role;
    }

    // Actualiza parcialmente un rol por su ID, asignando permisos si se proporcionan
    async partialUpdateRole(id: number, updateRoleDto: UpdateRoleDto) {

        const role = await this.findRole(id); // Verifica que exista el rol
        Object.assign(role, updateRoleDto); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        // Si el DTO trae un arreglo de IDs de permisos y no está vacío
        if (updateRoleDto.permissionIds && updateRoleDto.permissionIds.length > 0) {

            const permissionsEntities: PermissionEntity[] = []; // Crea un arreglo de entidades PermissionEntity

            // Recorre cada ID proporcionado en el DTO
            for (const id of updateRoleDto.permissionIds) {
                const permissionEntity = await this.permissionsService.findPermission(id);
                permissionsEntities.push(permissionEntity);
            }

            role.permissions = permissionsEntities; // Asigna al rol al array de entidades encontradas
        }

        await this.rolesRepository.save(role);
        return role;
    }

    // Elimina un rol por su ID
    async deleteRole(id: number) {
        await this.rolesRepository.delete(id);
        return { "message": "deleted" }
    }

}
