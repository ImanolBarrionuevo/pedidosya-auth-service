/**
 * Servicio de usuarios para la API.
 * Gestiona operaciones relacionadas con la entidad UserEntity, incluyendo lectura, actualización y eliminación.
 * También maneja la asignación de roles y validaciones por email.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../common/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/patch-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { PutUserDto } from './dto/put-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private roleService: RolesService,
    ) { }

    // ACLARACION // El método createUser está implementado únicamente en el flujo de registro (register)

    // Obtiene todos los usuarios con sus roles y permisos
    async findAllUser() {
        const allUsers = await this.usersRepository.find({
            relations: ['roles', 'roles.permissions'],
        });
        return allUsers
    }

    // Verifica si un usuario existe por su email
    async findUserExistentByEmail(email) {
        const user = await this.usersRepository.findOne({
            where: { email: email }
        });
        if (!user) {
            return false;
        }
        return true;
    }

    // Busca un usuario por su email, incluyendo roles y permisos
    async findOneByEmail(email) {
        const user = await this.usersRepository.findOne({
            where: { email: email },
            relations: ['roles', 'roles.permissions'],
        });
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        return user
    }

    // Busca un usuario por su ID, incluyendo roles y permisos
    async findUser(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id: id },
            relations: ['roles', 'roles.permissions'],
        });
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        return user
    }

    // Actualiza completamente un usuario por su ID, asignando un rol
    async updateUser(id: number, updateUser: PutUserDto) {

        const user = await this.findUser(id); // Verifica que exista el usuario
        Object.assign(user, updateUser); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        // Obtiene la entidad del rol y la asigna al usuario
        const roleEntity = await this.roleService.findRole(updateUser.roles);
        user.roles = roleEntity;

        await this.usersRepository.save(user);
        return user;
    }

    // Actualiza parcialmente un usuario por su ID, permitiendo actualizar el rol
    async partialUpdateUser(id: number, updateUserDto: UpdateUserDto) {

        const user = await this.findUser(id); // Verifica que exista el usuario
        Object.assign(user, updateUserDto); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        // Si se proporciona un rol, busca la entidad de rol y la asigna al usuario
        if (updateUserDto.role) {
            const roleEntity = await this.roleService.findRole(updateUserDto.role);
            user.roles = roleEntity;
        }

        const updatedUser = await this.usersRepository.save(user);
        return updatedUser;
    }

    // Elimina un usuario por su ID
    async deleteUser(id: number) {
        await this.usersRepository.delete(id);
        return { "message": "deleted" }
    }

}
