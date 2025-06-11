import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../common/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

  async createUser(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user)
    await this.usersRepository.insert(newUser)
    return await this.findUser(newUser.id)
  }

  async findAllUser() {
    const allUsers = await this.usersRepository.find({
      relations: ['roles-permissions', 'roles-permissions.roles'],
    });
    return allUsers
  }

  async findUsers() {
    return this.findAllUser()
  }

  async findOneByEmail(email) {
    const user = await this.usersRepository.findOne(email)
    if (!user) {
      return false;
    }
    return true
  }

  async findUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['roles-permissions', 'roles-permissions.roles'],
    });
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user
  }
  async updateUser(id: number, updateUser: CreateUserDto) {
    await this.usersRepository.update(id, updateUser)
    return this.findUser(id)
  }

  async partialUpdateUser(id: number, updateUser: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: id } })
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    Object.keys(updateUser).forEach(column => {
      user[column] = updateUser[column];
    })

    await this.usersRepository.update(id, user)
    return user
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete(id);
    return { "message": "deleted" }
  }

}
