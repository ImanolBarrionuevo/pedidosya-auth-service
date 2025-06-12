import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/common/entities/roles.entity';
import { RolesController } from './roles.controller';
import { PermissionEntity } from 'src/common/entities/permissions.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity]), UsersModule],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
