/**
 * Módulo de autenticación JWT.
 * Configura el JwtModule con opciones globales y lo exporta para uso en toda la aplicación.
 * También importa PassportModule para futuras estrategias de autenticación.
 */

import { Module } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule, // Módulo base para estrategias de autenticación
        JwtModule.register({
            global: true, // Permite usar JwtService sin importar el módulo explícitamente en otros módulos
            secret: jwtConstants.secretAuth, // Clave secreta para firmar los tokens JWT
            signOptions: {
                expiresIn: '1h', // Tiempo de expiración por defecto del token JWT
                algorithm: 'HS256' // Algoritmo de firma del token JWT
            },
        })],
    providers: [],
    exports: [JwtModule], // Exporta JwtModule para que otros módulos puedan usar JwtService
})

export class JwtAuthModule { }