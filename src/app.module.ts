import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/entities';
import { UsersController } from './users/users.controller';
import { AuthGuard } from './middlewares/auth.middleware';
import { UsersService } from './users/users.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { RolesService } from './roles/roles.service';
import { PermissionsService } from './permissions/permissions.service';
import { JwtAuthModule } from './common/jwt/jwt.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from './common/jwt/jwt.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'authuser',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      entities: entities,
    }),
    TypeOrmModule.forFeature(entities),
    JwtAuthModule
    //AuthModule,
    //UsersModule,
    //RolesModule,
    //PermissionsModule
  ],
  controllers: [AppController, UsersController, RolesController, PermissionsController, AuthController],
  providers: [AuthGuard, UsersService, RolesService, PermissionsService, AuthService, JwtService], 
})
export class AppModule { }
