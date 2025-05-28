import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(@Body() registerDto: RegisterDto,) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user)
    return this.authService.profile(user);
  }
}
