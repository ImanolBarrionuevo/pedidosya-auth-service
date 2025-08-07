/**
 * Servicio JWT para generación, verificación y renovación de tokens.
 * Administra tokens de autenticación y de refresco, usando `jsonwebtoken` y `dayjs`.
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as dayjs from 'dayjs';
import { JwtPayload } from 'jsonwebtoken';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtService {
    // Configuración de secretos y expiraciones para cada tipo de token // config.ts
    config = {
        auth: {
            secret: jwtConstants.secretAuth, // Token de autenticación
            expiresIn: '15m', // Expira en 15 minutos
        },
        refresh: {
            secret: jwtConstants.secretRefresh, // Token de refresco
            expiresIn: '1d', // Expira en 1 día
        },
    };

    // Genera un token JWT con el payload y tipo de token (auth o refresh) especificado
    generateToken(payload, type: 'refresh' | 'auth' = 'auth',): string { // Crea un JWT usando jsonwebtoken.sign()
        return sign(payload, this.config[type].secret, {
            expiresIn: this.config[type].expiresIn,
        });
    }

    // Genera un nuevo token de refresco o reutiliza el existente si está cerca de expirar
    refreshToken(refreshToken: string): { accessToken: string, refreshToken: string } { // Obtiene el payload del refresh token y calcula el tiempo restante hasta la expiración usando dayjs
        try {
            const payload = this.getPayload(refreshToken, 'refresh')

            if (payload.exp === undefined) {
                throw new UnauthorizedException('Token inválido: sin fecha de expiración');
            }
            // Obtiene el tiempo restante en minutos hasta la expiración
            const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');
            return { // Si faltan menos de 20 minutos para que expire, genera un nuevo refresh token y si aun es valido lo reutiliza
                accessToken: this.generateToken({ email: payload.email }),
                refreshToken:
                    timeToExpire < 20
                        ? this.generateToken({ email: payload.email }, 'refresh')
                        : refreshToken
            };
        } catch (error) {
            throw new UnauthorizedException(); // Si el refreshToken no es valido lanza un error
        }
    }

    // Verifica el token y devuelve el payload decodificado
    getPayload(token: string, type: 'refresh' | 'auth' = 'auth'): JwtPayload { //verifica el token con jsonwebtoken.verify()
        return verify(token, this.config[type].secret) as JwtPayload;
    }

}
