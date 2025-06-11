import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { PermissionEntity } from './permissions.entity';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; //Ej: Admin, user

  @ManyToMany(() => PermissionEntity, permission => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[]
}