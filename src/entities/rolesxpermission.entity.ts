import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Permission } from './permissions.entity';

@Entity('rolesxpermissions')
export class RolesxPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, role => role.id)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Permission, permission => permission.id)
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}