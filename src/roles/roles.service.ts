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

    // Creamos un rol
    async createRole(createRoleDto: CreateRoleDto) {
        const role = this.rolesRepository.create({
            name: createRoleDto.name,
        });

        // Buscamos los permisos usando los IDs enviados.
        if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
            for (const permissionId of createRoleDto.permissionIds) {
                const permission = await this.permissionsService.findPermission(permissionId);
                role.permissions.push(permission);
            }
        }

        // Guardamos el rol.
        await this.rolesRepository.save(role);
        return role;
    }

    // Buscamos todos los roles
    async findAllRole() {
        const allRoles = await this.rolesRepository.find({
            relations: ['permissions'], // Con sus permisos relacionados
        });
        return allRoles
    }

    // Buscamos un rol por su id
    async findRole(id: number) {
        const role = await this.rolesRepository.findOne({
            where: { id: id },
        });
        if (!role) {
            throw new NotFoundException("Role Not Found");
        }
        return role
    }

    // Actualizamos un rol
    async updateRole(id: number, updateRole: CreateRoleDto) {
        // Verificamos que el rol exista
        const role = await this.findRole(id);
        // Actualizamos las propiedades de un objeto a un objeto destino.
        Object.assign(role, updateRole);

        // Creamos un arreglo donde acumularemos las entidades PermissionEntity
        const permissionsEntities: PermissionEntity[] = [];
        // Recorremos cada id que vino en el DTO
        for (const id of updateRole.permissionIds) {
            const permissionEntity = await this.permissionsService.findPermission(id);
            permissionsEntities.push(permissionEntity);
        }
        // Asignamos al rol la lista completa de entidades encontradas
        role.permissions = permissionsEntities;
        
        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones.
        await this.rolesRepository.save(role);
        return role;
    }

    // Actualizamos parcialmente un rol 
    async partialUpdateRole(id: number, updateRoleDto: UpdateRoleDto) {

        // Verificamos que haya un rol con el id que recibimos
        const role = await this.findRole(id);

        // Actualizamos las propiedades de un objeto a un objeto destino.
        Object.assign(role, updateRoleDto);

        // Si el DTO trae un arreglo de IDs de permisos y no está vacío
        if (updateRoleDto.permissionIds && updateRoleDto.permissionIds.length > 0) {
            // Creamos un arreglo donde acumularemos las entidades PermissionEntity
            const permissionsEntities: PermissionEntity[] = [];
             // Recorremos cada id que vino en el DTO
            for (const id of updateRoleDto.permissionIds) {
                const permissionEntity = await this.permissionsService.findPermission(id);
                permissionsEntities.push(permissionEntity);
            }
            // Asignamos al rol la lista completa de entidades encontradas
            role.permissions = permissionsEntities;
        }

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones.
        await this.rolesRepository.save(role);
        return role;
    }

    // Eleminamos un rol
    async deleteRole(id: number) {
        await this.rolesRepository.delete(id);
        return { "message": "deleted" }
    }

}
