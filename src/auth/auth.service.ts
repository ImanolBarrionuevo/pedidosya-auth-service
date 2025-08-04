import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from 'src/common/jwt/jwt.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/common/entities/users.entity';
import { RoleEntity } from 'src/common/entities/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    // Repositorio de UserEntity para operaciones CRUD en users
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    // Inyecta UsersService para comprobaciones del usuario
    private readonly usersService: UsersService,
    // Inyecta JwtService para generar y validar tokens
    private readonly jwtService: JwtService,
    // Repositorio de RoleEntity para operaciones CRUD en roles
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>
  ) { }

  async register(userObjectRegister: RegisterAuthDto) {
    // Verificamos que el email no esté en uso
    const userExistent = await this.usersService.findUserExistentByEmail(userObjectRegister.email)
    if (userExistent) {
      throw new BadRequestException("Email ya registrado");
    }

    // Buscamos el role por su id (id=1)
    const roleFound = await this.roleRepository.findOneBy({ id: userObjectRegister.role });
    if (!roleFound) {
      throw new NotFoundException("El rol no existe");
    }

    // Obtenemos los datos del usuario a registrar
    const { email, password, name } = userObjectRegister; //La password esta en texto plano (12345)

    // Hasheamos la constraseña
    const plainToHash = await hash(password, 10) // Número de aleatoriedad de la constraseña

    // Creamos y guardamos la entidad del usuario nuevo
    const newUser = this.userRepository.create({
      email,
      name,
      password: plainToHash,
      roles: roleFound // Rol por defecto
    });
    return this.userRepository.save(newUser)
  }

  async login(userObjectLogin: LoginAuthDto) {
    // Obtenemos los datos del usuario logueado
    const { email, password } = userObjectLogin;

    // Buscamos al usuario por su email junto a su rol y permisos asociaciados
    const findUser = await this.userRepository.findOne({ 
      where: { email }, 
      relations: ['roles', 'roles.permissions'] 
    })
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)

    // Comparamos la contraseña ingresada con la contraseña hasheada del usuario
    const checkPassword = await compare(password, findUser.password) 
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

    // Preparamos los datos con email y permisos del usuario para generar el accessToken
    const payload = { email: findUser.email }

    // Generamos accessToken y refreshToken
    const data = {
      accessToken: await this.jwtService.generateToken(payload),
      refreshToken: await this.jwtService.generateToken(
        { email: findUser.email },
        'refresh'
      )
    };

    return data
  }

  async canUserDo(token: string, permissions: string[]): Promise<boolean> {
  try {
    // Extraemos payload del token, lanzando un error si es invalido
    const payload = this.jwtService.getPayload(token, 'auth');

    // Obtenemos permisos del usuario
    const user = await this.usersService.findOneByEmail(payload.email);
    const userPerms: string[] = user.roles.permissions.map(p => p.code);
    //const userPerms: string[] = (payload.permissions || []).map(p => p.code);

    // Verificamos que el usuario cuente con los permisos necesarios, devolviendo un booleano
    const hasAllPermissions = permissions.every(p => userPerms.includes(p));

    return hasAllPermissions;
  } catch (error) {
    throw new UnauthorizedException('Token inválido');
  }
}
}