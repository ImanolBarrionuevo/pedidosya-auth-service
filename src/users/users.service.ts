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

  // El createUser está implementado únicamente en el register

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
      throw new NotFoundException("User Not Found");
    }
    return user
  }

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

  async updateUser(id: number, updateUser: PutUserDto) {
    // Verificamos que el usuario exista
    const user = await this.findUser(id);

    // Actualizamos las propiedades simples (no objetos) que el DTO puede tener.
    Object.assign(user, updateUser);

    // Buscamos la entidad del rol para asignarla al usuario
    const roleEntity = await this.roleService.findRole(updateUser.roles);
    user.roles = roleEntity; // Asignamos la entidad de rol al usuario

    await this.usersRepository.save(user);
    return user;
  }

  async partialUpdateUser(id: number, updateUserDto: UpdateUserDto) {

    // Buscamos el usuario por ID verificando que exista
    const user = await this.findUser(id);

    // Actualizamos las propiedades simples de un objeto.
    Object.assign(user, updateUserDto);

    // Si se proporciona un rol, buscamos la entidad de rol y la asignamos al usuario.
    if (updateUserDto.role) {
      const roleEntity = await this.roleService.findRole(updateUserDto.role);
      user.roles = roleEntity;
    }

    // Guardamos la entidad completa para que se actualicen tanto columnas simples como relaciones.
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete(id);
    return { "message": "deleted" }
  }

}
