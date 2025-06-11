import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from './roles.entity';
import { PermissionEntity } from './permissions.entity';

@Entity('RolesxPermissions')
export class RolesxPermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, role => role.id)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, permission => permission.id)
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity;
}