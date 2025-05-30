import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './roles.entity';

@Entity('Users')
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  email: string;
  
  @Column()
  password: string;

  @ManyToOne(() => Role, role => role.id)
  @JoinColumn({ name: 'id' })
  role: number;
}
