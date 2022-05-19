import { Column, Entity, OneToMany } from 'typeorm';

import Todo from './todo.models';

import DefaultModel from './default.models';

@Entity('lists')
class List extends DefaultModel {
  @Column()
  title: string;

  @OneToMany(() => Todo, todo => todo.list)
  todos: Todo[];
}

export default List;
