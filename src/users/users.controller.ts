import { Body, Controller, Get, Param, Post, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.enum';
import { PermissionsDecorator } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('user')
//@UseGuards(AuthGuard)
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Post()
  @PermissionsDecorator(Permissions.CreateUser)
  postUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Get()
  @PermissionsDecorator(Permissions.ReadUser)
  getUsers() {
    return this.usersService.findAllUser()
  }

  @Get(':id')
  getUser(@Param('id') idUser: number) {
    return this.usersService.findUser(idUser)
  }

  @Put(':id')
  putUser(@Param('id') idUser: number, @Body() updateUser: CreateUserDto) {
    return this.usersService.updateUser(idUser, updateUser)
  }

  @Patch(':id')
  patchUser(@Param('id') idUser: number, @Body() partialUpdateUser: UpdateUserDto) {
    return this.usersService.partialUpdateUser(idUser, partialUpdateUser)
  }

  @Delete(':id')
  deleteUser(@Param('id') idUser: number) {
    return this.usersService.deleteUser(idUser)
  }

}


