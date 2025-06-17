import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/entities';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'authuser',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule
  ],
  controllers: [AppController, UsersController],
  providers: [], 
})
export class AppModule { }
