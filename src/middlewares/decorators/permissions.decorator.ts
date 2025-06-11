import { SetMetadata } from '@nestjs/common';
import { UserRole, Permissions } from './permissions.enum';

//Decidir si se trabajara con Permissions o Roles para controlar el acceso a rutas
export const PERMISSIONS_KEY = 'permissions';
export const permissions = (...permissions: Permissions[]) => SetMetadata(PERMISSIONS_KEY, permissions);

export const ROLES_KEY = 'roles';
export const roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);