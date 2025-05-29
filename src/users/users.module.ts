import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule
],
  providers: [UsersService],
  exports: [UsersService], // Exportamos el servicio para que otros módulos puedan usarlo
})
export class UsersModule {}
