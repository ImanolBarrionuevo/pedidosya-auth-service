import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/patch-user.dto';

@Controller('user')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Post()
  postUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Get()
  getRole() {
    return this.usersService.findUsers()
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
