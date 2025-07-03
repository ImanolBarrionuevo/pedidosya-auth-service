import { Body, Controller, Get, Param, Post, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PutUserDto } from './dto/put-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.enum';
import { PermissionsDecorator } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {

  // Inyectamos el servicio de usuario
  constructor(private usersService: UsersService) { }

  // Obtenemos todos los usuarios
  @Get()
  @PermissionsDecorator(Permissions.ReadUser)
  getUsers() {
    return this.usersService.findAllUser()
  }

  // Obtenemos un usuario especifico
  @Get(':id')
  @PermissionsDecorator(Permissions.ReadUser)
  getUser(@Param('id') idUser: number) {
    return this.usersService.findUser(idUser)
  }

  // Actualizamos un usuario
  @Put(':id')
  @PermissionsDecorator(Permissions.ModifyUser)
  putUser(@Param('id') idUser: number, @Body() updateUser: PutUserDto) {
    return this.usersService.updateUser(idUser, updateUser)
  }
  
  // Actualizamos parcialmente un usuario
  @Patch(':id')
  @PermissionsDecorator(Permissions.ModifyUser)
  patchUser(@Param('id') idUser: number, @Body() partialUpdateUser: UpdateUserDto) {
    return this.usersService.partialUpdateUser(idUser, partialUpdateUser)
  }

  // Eliminamos un usuario por id
  @Delete(':id')
  @PermissionsDecorator(Permissions.DeleteUser)
  deleteUser(@Param('id') idUser: number) {
    return this.usersService.deleteUser(idUser)
  }

}


