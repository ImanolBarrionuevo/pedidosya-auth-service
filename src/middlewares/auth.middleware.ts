/**
 * Guard de autenticación y autorización.
 * Verifica el token JWT, recupera el usuario desde la base de datos,
 * y valida si posee los permisos requeridos definidos mediante metadata.
 */

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequestWithUser } from '../common/interface/request-user';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from 'src/common/jwt/jwt.constants';
import { PERMISSIONS_KEY } from './decorators/permissions.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService, // Servicio para verificar y decodificar tokens JWT
        private readonly usersService: UsersService, // Servicio para acceder a los usuarios y sus roles
        private readonly reflector: Reflector // Utilidad para acceder a metadata de decoradores
    ) { }

    // Método que se ejecuta para verificar si el guard permite el acceso a la ruta
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: RequestWithUser = context.switchToHttp().getRequest(); // Obtiene el objeto Request del contexto de ejecución
            const token = this.extractTokenFromHeader(request); // Extrae el token del header Authorization
            if (!token) {
                throw new UnauthorizedException('El token no existe');
            }

            // Verifica el token y obtiene el payload decodificado
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secretAuth,
                    algorithms: ['HS256']
                }
            );

            // Busca el usuario por su email desde el payload del token 
            // Busca al usuario para, si se actualizan los permisos, no tener que esperar actualización del token
            const user = await this.usersService.findOneByEmail(payload.email);

            request.user = user; // Asigna el usuario encontrado al objeto Request para que esté disponible en el controlador

            // Obtiene los permisos requeridos definidos en la metadata del endpoint
            const requiredPermissions = this.reflector.get<Permissions[]>(
                PERMISSIONS_KEY,
                context.getHandler()
            );
            // Si no hay permisos definidos, se permite el acceso
            if (requiredPermissions && requiredPermissions.length > 0) {
                const userPermissions: string[] = (user.roles.permissions || []).map(permission => permission.code); // Extrae los códigos de permisos del usuario
                const hasPermission = requiredPermissions.every(permission =>
                    userPermissions.includes(permission.toString()) //Convierte de tipo Permissions (enum) a string
                );
                if (!hasPermission) {
                    throw new UnauthorizedException('No tienes los permisos necesarios');
                }
            }
            return true;

        } catch (error) {
            throw new UnauthorizedException(error?.message);
        }
    }

    // Método para extraer el token del header Authorization
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []; // Divide el header Authorization en tipo y token
        return type === 'Bearer' ? token : undefined; // Retorna el token si es del tipo Bearer, undefined en caso contrario
    }

}

