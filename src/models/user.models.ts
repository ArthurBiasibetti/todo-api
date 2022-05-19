import { Entity, Column, OneToMany } from 'typeorm';
import defaultModel from './default.models';
import List from './list.models';

@Entity('users')
class User extends defaultModel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => List, list => list.user)
  lists: List[];
}

export default User;
