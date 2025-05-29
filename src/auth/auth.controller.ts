import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto,) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginAuthDto,
  ) {
    return this.authService.login(loginDto);
  }

  /*@Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user)
    return this.authService.profile(user);
  }*/
}
