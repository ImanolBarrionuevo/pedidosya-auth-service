import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolesxPermissions } from './rolesxpermission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; //Ej: Admin, user

  // Relación uno a muchos hacia la entidad intermedia
  @OneToMany(() => RolesxPermissions, rolesxPermissions => rolesxPermissions.role)
  rolesxPermissions: RolesxPermissions[];
}