import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/users.entity';
import { UsersService } from './users.service';
import { JwtAuthModule } from '../common/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtAuthModule
],
  providers: [UsersService],
  exports: [UsersService], // Exportamos el servicio para que otros módulos puedan usarlo
})
export class UsersModule {}
