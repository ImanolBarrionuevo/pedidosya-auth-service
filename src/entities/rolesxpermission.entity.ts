// src/roles/entities/rolesxpermissions.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Permission } from './permissions.entity';

@Entity('rolesxpermissions')
export class RolesxPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, role => role.rolesxPermissions)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Permission, permission => permission.rolesxPermissions)
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}