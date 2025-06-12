import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('Users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn()
  roles: RoleEntity;
}
