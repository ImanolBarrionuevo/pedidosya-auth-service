//ACTUALIZAR LOGICA DEL CAN ACTIVATE 

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequestWithUser } from '../common/interface/request-user'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from 'src/common/jwt/jwt.constants';
import { PERMISSIONS_KEY } from './decorators/permissions.decorator';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: RequestWithUser = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('El token no existe');
      }

      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      //Buscamos al usuario por si se actualizan los permisos, no tener que esperar actualización del token
      const user = await this.usersService.findOneByEmail(payload.email);
      request.user = user;
      //Lógica permisos
      const requiredPermissions = this.reflector.get<Permissions[]>(
        PERMISSIONS_KEY,
        context.getHandler()
      );
      // Si no se definieron permisos en la ruta, se permite el acceso
      if (requiredPermissions && requiredPermissions.length > 0) {
        const userPermissions: string[] = (user.role.permissions || []).map(permission => permission.code); //Traemos todos los permisos del usuario
        const hasPermission = requiredPermissions.every(permission =>
          userPermissions.includes(permission.toString()) //Convertimos de tipo Permissions (enum) a string
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

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

