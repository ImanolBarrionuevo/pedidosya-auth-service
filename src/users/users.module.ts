import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/users.entity';
import { UsersService } from './users.service';
import { JwtAuthModule } from '../common/jwt/jwt.module';
import { RoleEntity } from 'src/common/entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    JwtAuthModule
],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
