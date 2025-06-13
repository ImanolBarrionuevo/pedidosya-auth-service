import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from 'src/common/jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}


  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @HttpCode(200) //Cambiamos el code 201 Created por defecto del POST por 200 OK ya que en sí no creamos nada
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @HttpCode(200)
  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken:string){
    return this.jwtService.refreshToken(refreshToken)
  }
  //Comprobar
  @Post('/can-do')
  async canDo(@Body() body: { token: string; permissions: string[] }) {
    const { token, permissions } = body;
    const allowed = await this.authService.canUserDo(token, permissions);
    return { allowed };
  }
}
