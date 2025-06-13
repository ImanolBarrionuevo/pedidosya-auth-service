import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntity } from '../common/entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/patch-role.dto';
import { PermissionEntity } from 'src/common/entities/permissions.entity';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity) private permissionsRepository: Repository<PermissionEntity>
    ) { }

    async createRole(createRoleDto: CreateRoleDto) {
        // Creamos la entidad a partir del DTO
        const role = this.rolesRepository.create({
            name: createRoleDto.name,
        });

        // Buscamos los permisos usando los IDs enviados
        if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
            role.permissions = await this.permissionsRepository.findByIds(createRoleDto.permissionIds);
        }

        // Guardamos el rol, llenando la tabla intermedia
        await this.rolesRepository.save(role);
        return await this.findRole(role.id)
    }

    async findAllRole() {
        const allRoles = await this.rolesRepository.find({
            relations: ['permissions'],
        });
        return allRoles
    }

    async findRoles() {
        return this.findAllRole()
    }

    async findRole(id: number) {
        const role = await this.rolesRepository.findOne({
            where: { id: id },
        });
        if (!role) {
            throw new NotFoundException("Usuario no encontrado");
        }
        return role
    }
    async updateRole(id: number, updateRole: CreateRoleDto) {
        await this.rolesRepository.update(id, updateRole)
        return this.findRole(id)
    }

    async partialUpdateRole(id: number, updateRoleDto: UpdateRoleDto) {

        const role = await this.rolesRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException("Rol no encontrado");
        }

        // Si el DTO tiene una propiedad relacional para el rol, actualízala de forma explícita.
        if (updateRoleDto.permissionIds && updateRoleDto.permissionIds.length > 0) {
            const permissionsEntities: PermissionEntity[] = [];
            for (const id of updateRoleDto.permissionIds) {
                const permissionEntity = await this.permissionsRepository.findOne({ where: { id } });
                if (permissionEntity) {
                    permissionsEntities.push(permissionEntity);
                }
            }
            role.permissions = permissionsEntities;
        }

        // Actualiza las propiedades de un objeto a un objeto destino.
        Object.assign(role, updateRoleDto);

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones.
        await this.rolesRepository.save(role);
        return role;
    }

    async deleteRole(id: number) {
        await this.rolesRepository.delete(id);
        return { "message": "deleted" }
    }

}
