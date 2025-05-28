import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({type: 'postgres',
    host: 'localhost',
    database: 'authUser',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}']}),
    TypeOrmModule.forFeature(entities),
    AuthModule,
  ],
  controllers: [AppController,UsersController],
  providers: [AuthGuard, JwtService, UsersService],
})
export class AppModule {}
