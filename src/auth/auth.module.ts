import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/common/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from 'src/common/jwt/jwt.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    JwtAuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
