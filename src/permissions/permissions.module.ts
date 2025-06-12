import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/common/entities/permissions.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([PermissionEntity]), UsersModule],
    controllers: [PermissionsController],
    providers: [PermissionsService]})
export class PermissionsModule {
    
}
 