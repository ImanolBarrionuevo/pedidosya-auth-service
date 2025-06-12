import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../common/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { RoleEntity } from 'src/common/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>  
  ) { }

  async createUser(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user)
    await this.usersRepository.insert(newUser)
    return await this.findUser(newUser.id)
  }

  async findAllUser() {
    const allUsers = await this.usersRepository.find({
      relations: ['roles', 'roles.permissions'],
    });
    return allUsers
  }

  async findUserExistentByEmail(email) {
    const user = await this.usersRepository.findOne({
      where: { email: email }});
    if (!user) {
      return false;
    }
    return true;
  }
 
  async findOneByEmail(email) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user
  }

  async findUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user
  }

  async updateUser(id: number, updateUser: UpdateUserDto) {
    await this.usersRepository.update(id, updateUser)
    return this.findUser(id)
  }

  async partialUpdateUser(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    // Si el DTO tiene una propiedad relacional para el rol, actualízala de forma explícita.
    if (updateUserDto.role) {
      // Suponiendo que updateUserDto.role es un número (el ID del rol)
      const roleEntity = await this.roleRepository.findOne({ where: { id: updateUserDto.role} });
      console.log(roleEntity)
      if (roleEntity) {
        user.roles = roleEntity;
      }
    }

    // Actualiza las propiedades simples que el DTO puede tener.
    // Puedes usar Object.assign para las propiedades simples que no sean relaciones.
    Object.assign(user, updateUserDto);

    // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones.
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete(id);
    return { "message": "deleted" }
  }

}
