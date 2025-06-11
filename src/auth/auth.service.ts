import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/common/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userObjectRegister:RegisterAuthDto) {
    const user = await this.usersService.findOneByEmail(userObjectRegister.email)
    if (user) {
      throw new BadRequestException("Email ya registrado");
    }
    const {password} = userObjectRegister //Esta en texto plano (12345)
    const plainToHash = await hash(password, 10) //Numero de aleatoriedad de la constraseña ($y/ysd83)
    userObjectRegister = {...userObjectRegister, password:plainToHash};
    const userWithRole = {
      ...userObjectRegister, 
      role: {id: userObjectRegister.role}
    }
    const newUser = this.userRepository.create(userWithRole)
    return this.userRepository.save(newUser)
  }

  async login(userObjectLogin: LoginAuthDto) {
    const {email, password} = userObjectLogin;
    const findUser = await this.userRepository.findOne({where: {email}})
    if(!findUser) throw new HttpException('USER_NOT_FOUND', 404)
    
    
    const checkPassword = await compare(password, findUser.password) //Porque me lo toma como que puede ser null

    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

    const payload = {id: findUser.id, name: findUser.name}
    const token = await this.jwtService.signAsync(payload)

    const data = {
      'user': findUser,
      token
    };

    return data

  }

  
}