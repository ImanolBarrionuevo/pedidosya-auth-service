import {Injectable} from '@nestjs/common';
import { UserEntity } from '../common/entities/users.entity';


@Injectable()
export class UsersService {
  repository = UserEntity;
  constructor() {}

}
