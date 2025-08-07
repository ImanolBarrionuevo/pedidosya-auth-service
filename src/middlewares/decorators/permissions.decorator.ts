/**
 * Decorador personalizado para asignar permisos a rutas o controladores.
 * Utiliza metadata para que los guards puedan acceder a los permisos requeridos.
 */

import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permissions.enum';

export const PERMISSIONS_KEY = 'permissions'; // Clave utilizada para almacenar los permisos en la metadata
export const PermissionsDecorator = (...permissions: Permissions[]) => SetMetadata(PERMISSIONS_KEY, permissions); // Decorador que asigna permisos a una ruta o controlador
