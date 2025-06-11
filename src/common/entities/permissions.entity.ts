import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('Permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; //Ej: "CREATE_USER", "DELETE_USER"

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[]
}