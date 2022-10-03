import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'date', nullable: true, name: 'tokenexp' })
  tokenExp: string;
}
