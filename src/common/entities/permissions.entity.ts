import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; //Ej: "CREATE_USER", "DELETE_USER"
}