import {Injectable} from '@nestjs/common';
import { UserEntity } from '../entities/users.entity';
import { JwtService } from 'src/jwt/jwt.service';


@Injectable()
export class UsersService {
  repository = UserEntity;
  constructor(private jwtService: JwtService) {}
}
