import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      global: true, //Sirve para no tener que importarlo en ningun otro lugar de la aplicación el JwtModule
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
      })],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class JwtAuthModule {}