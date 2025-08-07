/**
 * Controlador de autenticación para la API.
 * Expone endpoints para registrar usuarios, iniciar sesión, renovar tokens y validar permisos.
 * Este módulo gestiona la seguridad mediante JWT y lógica de autorización personalizada.
 */

import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from 'src/common/jwt/jwt.service';

@Controller('auth')
export class AuthController {
  // Inyecta los servicios de autenticación y manejo de JWT
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }

  // Registra un nuevo usuario con los datos del DTO
  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  // Inicia sesión y retorna accessToken y refreshToken
  @HttpCode(200) // Retorna 200 OK en lugar de 201 Created, ya que no se crea un recurso
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  // Renueva el token de acceso a partir de un refreshToken valido
  @HttpCode(200)
  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken)
  }

  // Verifica si un token tiene permisos requeridos, retornando un boolean
  @Post('/can-do')
  async canDo(@Body() body: { token: string; permissions: string[] }) {
    const { token, permissions } = body;
    const allowed = await this.authService.canUserDo(token, permissions);
    return { allowed };
  }
}
