import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  email: string;

  @Column()
  displayName: string;
}
