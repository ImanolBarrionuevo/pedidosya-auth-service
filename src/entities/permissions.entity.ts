import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolesxPermissions } from './rolesxpermission.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; //Ej: "CREATE_USER", "DELETE_USER"

  // Relación uno a muchos hacia la entidad intermedia
  @OneToMany(() => RolesxPermissions, rolesxPermissions => rolesxPermissions.permission)
  rolesxPermissions: RolesxPermissions[];
}