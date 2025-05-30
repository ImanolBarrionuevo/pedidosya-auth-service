import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/entities';
//import { AuthGuard } from './middlewares/auth.middleware';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { RolesPermissionsModule } from './roles-permissions/roles-permissions.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({type: 'postgres',
    host: 'localhost',
    database: 'authuser',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}']}),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    RolesPermissionsModule,
    UsersModule,
    RolesModule,
    PermissionsModule
  ],
  controllers: [AppController,UsersController],
  providers: [UsersService], //FALTA AuthGuard
})
export class AppModule {}
