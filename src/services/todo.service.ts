import Todo from '@models/todo.models';
import List from '@models/list.models';

import AppError from '@utils/AppError.utils';
import cleanObject from '@utils/cleanObject.utils';

import { getRepository } from 'typeorm';

export interface ITodoRequest {
  title: string;
  description: string;
}

export interface ITodoUpdateRequest {
  title?: string;
  description?: string;
  isChecked?: boolean;
}

export const createTodo = async (
  listId: string,
  { title, description }: ITodoRequest,
) => {
  const todoRepository = getRepository(Todo);
  const listRepository = getRepository(List);

  const list = await listRepository.findOne({ id: listId });

  if (!list) {
    throw new AppError('List not exist!');
  }

  const todo = todoRepository.create({
    title,
    description,
    list: list,
  });

  await todoRepository.save(todo);

  return todo;
};

export const findTodo = async (id: string) => {
  const todoRepository = getRepository(Todo);

  const todo = await todoRepository.findOne({ id });

  if (!todo) {
    throw new AppError('Todo not exist!');
  }

  return todo;
};

export const findTodos = async () => {
  const todoRepository = getRepository(Todo);

  const todo = await todoRepository.find({
    order: {
      createdAt: 'DESC',
    },
  });

  return todo;
};

export const updateTodo = async (id: string, newTodo: ITodoUpdateRequest) => {
  const todoRepository = getRepository(Todo);

  const todo = await todoRepository.findOne({ id });

  if (!todo) {
    throw new AppError('Todo not exist!');
  }

  const cleanedTodo = await cleanObject(newTodo);

  const updatedTodo = { ...todo, ...cleanedTodo };

  await todoRepository.save(updatedTodo);

  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const todoRepository = getRepository(Todo);

  const todo = await todoRepository.findOne(id);

  if (!todo) {
    throw new AppError('Todo not exist!');
  }

  await todoRepository.remove(todo);
};
