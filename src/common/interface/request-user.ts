import { Request } from 'express';
import { UserEntity } from '../../common/entities/users.entity';

export interface RequestWithUser extends Request {
  user?: UserEntity;
}
