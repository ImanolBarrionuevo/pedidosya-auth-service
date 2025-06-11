//Si protegemos rutas con roles
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

//Si protegemos rutas con permisos
export enum Permissions {
  CreatePerson = 'CREATE_USER',
  ModifyUser = 'MODIFY_USER',
  ReadUser = 'READ_USER',
  DeleteUser = 'DELETE_USER'
  //Seguir agregando permisos
}