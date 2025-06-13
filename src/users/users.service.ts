import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../common/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/patch-user.dto';
import { RoleEntity } from 'src/common/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    
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

  async updateUser(id: number, updateUser: UpdateUserDto) {
    await this.usersRepository.update(id, updateUser)
    return this.findUser(id)
  }

  async partialUpdateUser(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    if (updateUserDto.role) {
      const roleEntity = await this.roleRepository.findOne({ where: { id: updateUserDto.role} });
      if (roleEntity) {
        user.roles = roleEntity;
      }
    }

    // Actualizamos las propiedades de un objeto a un objeto destino.
    Object.assign(user, updateUserDto);

    // Guardamos la entidad completa para que se actualicen tanto columnas simples como relaciones.
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete(id);
    return { "message": "deleted" }
  }

}
