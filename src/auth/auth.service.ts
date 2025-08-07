/**
 * Servicio de autenticación.
 * Administra el registro, login y verificación de permisos de usuarios.
 * Utiliza bcrypt para el hashing de contraseñas y JWT para la gestión de tokens.
 */

import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from 'src/common/jwt/jwt.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/common/entities/users.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, // Repositorio UserEntity para operaciones CRUD en users
        private readonly usersService: UsersService, // Inyecta UsersService para comprobaciones del usuario
        private readonly jwtService: JwtService, // Inyecta JwtService para generación y validación de tokens
        private readonly rolesService: RolesService // Inyecta RolesService para obtención y validación de roles
    ) { }

    // Registra un nuevo usuario, asignando un rol por defecto y hasheando la contraseña
    async register(userObjectRegister: RegisterAuthDto) {

        const userExistent = await this.usersService.findUserExistentByEmail(userObjectRegister.email) // Verifica que el email no esté en uso
        if (userExistent) {
            throw new BadRequestException("Email ya registrado");
        }

        const roleFound = await this.rolesService.findRole(userObjectRegister.role); // Busca el rol por su ID (id=1)
        const { email, password, name } = userObjectRegister; // Obtiene los datos del usuario a registrar// La password está en texto plano (12345)
        const plainToHash = await hash(password, 10) // Hashea la constraseña // 10 : Número de aleatoriedad de la constraseña

        // Crea y guarda la entidad del usuario nuevo
        const newUser = this.userRepository.create({
            email,
            name,
            password: plainToHash,
            roles: roleFound // Rol por defecto
        });
        return this.userRepository.save(newUser)
    }

    // Inicia sesión, validando las credenciales y generando tokens de acceso y refresco
    async login(userObjectLogin: LoginAuthDto) {

        const { email, password } = userObjectLogin; // Obtiene los datos del usuario logueado

        // Busca al usuario por su email junto a su rol y permisos asociaciados
        const findUser = await this.userRepository.findOne({
            where: { email },
            relations: ['roles', 'roles.permissions']
        })
        if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)

        // Compara la contraseña ingresada con la contraseña hasheada del usuario
        const checkPassword = await compare(password, findUser.password)
        if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        const payload = { email: findUser.email } // Crea el payload con el email del usuario para generar los tokens

        // Genera accessToken y refreshToken
        const data = {
            accessToken: await this.jwtService.generateToken(payload),
            refreshToken: await this.jwtService.generateToken(
                { email: findUser.email },
                'refresh'
            )
        };

        return data
    }

    // Verifica si el usuario tiene los permisos necesarios para realizar una acción
    async canUserDo(token: string, permissions: string[]): Promise<boolean> {
        try {

            const payload = this.jwtService.getPayload(token, 'auth'); // Extrae payload del token y lanza un error si es invalido

            // Obtiene los permisos del usuario
            const user = await this.usersService.findOneByEmail(payload.email);
            const userPerms: string[] = user.roles.permissions.map(p => p.code);

            // Verifica que el usuario cuente con los permisos necesarios, devolviendo un boolean
            const hasAllPermissions = permissions.every(p => userPerms.includes(p));
            return hasAllPermissions;

        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }

}