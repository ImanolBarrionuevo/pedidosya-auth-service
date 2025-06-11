import { SetMetadata } from '@nestjs/common';
import { UserRole } from './permissions.enum';

//Decidir si se trabajara con Permissions o Roles para controlar el acceso a rutas
export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: UserRole[]) => SetMetadata(PERMISSIONS_KEY, permissions);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);