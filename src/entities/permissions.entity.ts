import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; //Ej: "CREATE_USER", "DELETE_USER"
}