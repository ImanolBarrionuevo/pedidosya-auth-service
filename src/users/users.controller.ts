/**
 * Controlador de usuarios para la API.
 * Expone endpoints para leer, actualizar y eliminar usuarios.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 * Además, se protege con el middleware de autenticación.
 */

import { Body, Controller, Get, Param, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PutUserDto } from './dto/put-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.enum';
import { PermissionsDecorator } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {

  // Inyecta el servicio de usuario
  constructor(private usersService: UsersService) { }

  // Obtiene todos los usuarios // Permiso: READ_USER
  @Get()
  @PermissionsDecorator(Permissions.ReadUser)
  getUsers() {
    return this.usersService.findAllUser()
  }

  // Obtiene un usuario específico por ID // Permiso: READ_USER
  @Get(':id')
  @PermissionsDecorator(Permissions.ReadUser)
  getUser(@Param('id') idUser: number) {
    return this.usersService.findUser(idUser)
  }

  // Actualiza completamente un usuario por ID // Permiso: MODIFY_USER
  @Put(':id')
  @PermissionsDecorator(Permissions.ModifyUser)
  putUser(@Param('id') idUser: number, @Body() updateUser: PutUserDto) {
    return this.usersService.updateUser(idUser, updateUser)
  }

  // Actualiza parcialmente un usuario por ID // Permiso: MODIFY_USER
  @Patch(':id')
  @PermissionsDecorator(Permissions.ModifyUser)
  patchUser(@Param('id') idUser: number, @Body() partialUpdateUser: UpdateUserDto) {
    return this.usersService.partialUpdateUser(idUser, partialUpdateUser)
  }

  // Elimina un usuario por ID // Permiso: DELETE_USER
  @Delete(':id')
  @PermissionsDecorator(Permissions.DeleteUser)
  deleteUser(@Param('id') idUser: number) {
    return this.usersService.deleteUser(idUser)
  }

}


