import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntity } from '../common/entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/patch-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>) { }

    async createRole(role: CreateRoleDto) {
        const newRole = this.rolesRepository.create(role)
        await this.rolesRepository.insert(newRole)
        return await this.findRole(newRole.id)
    }

    async findAllRole() {
        const allRoles = await this.rolesRepository.find({
            relations: ['roles', 'roles.permissions'],
        });
        return allRoles
    }

    async findRoles() {
        return this.findAllRole()
    }

    async findRole(id: number) {
        const role = await this.rolesRepository.findOne({
            where: { id: id },
            relations: ['roles-permissions', 'roles-permissions.roles'],
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

    async partialUpdateRole(id: number, updateRole: UpdateRoleDto) {
        const role = await this.rolesRepository.findOne({ where: { id: id } })
        if (!role) {
            throw new NotFoundException("Usuario no encontrado");
        }

        Object.keys(updateRole).forEach(column => {
            role[column] = updateRole[column];
        })

        await this.rolesRepository.update(id, role)
        return role
    }

    async deleteRole(id: number) {
        await this.rolesRepository.delete(id);
        return { "message": "deleted" }
    }


}
