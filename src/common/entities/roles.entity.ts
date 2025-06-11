import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; //Ej: Admin, user
}