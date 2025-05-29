import {Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { JwtService } from '@nestjs/jwt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userObject:RegisterAuthDto) {
    const {password} = userObject//Esta en texto plano (12345)
    const plainToHash = await hash(password, 10) //Numero de aleatoriedad de la constraseña ($y/ysd83)
    userObject = {...userObject, password:plainToHash};
    return this.userRepository.create(userObject)
  }

  async login({ email, password }: LoginAuthDto) {
  }

}