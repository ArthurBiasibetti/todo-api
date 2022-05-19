import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

import Todo from './todo.models';
import User from './user.models';

import DefaultModel from './default.models';

@Entity('lists')
class List extends DefaultModel {
  @Column()
  title: string;

  @OneToMany(() => Todo, todo => todo.list)
  todos: Todo[];

  @ManyToOne(() => User, user => user.lists)
  user: User;
}

export default List;
