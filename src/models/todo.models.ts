import { Column, Entity, ManyToOne } from 'typeorm';

import DefaultModel from './default.models';
import List from './list.models';

@Entity('todos')
class Todo extends DefaultModel {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isChecked: boolean = false;

  @ManyToOne(() => List, list => list.todos)
  list: List;
}

export default Todo;
