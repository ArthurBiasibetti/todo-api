import { Request, Response } from 'express';
import {
  createTodo,
  deleteTodo,
  findTodo,
  findTodos,
  updateTodo,
  ITodoUpdateRequest,
} from '../services/todo.service';

export const createTodoHandle = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const { title, description } = req.body;

  const todo = await createTodo(listId, { title, description });

  return res.json(todo);
};

export const findTodoHandle = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await findTodo(id);

  return res.json(todo);
};

export const findTodosHandle = async (req: Request, res: Response) => {
  const todo = await findTodos();

  return res.json(todo);
};

export const updateTodoHandle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, isChecked }: ITodoUpdateRequest = req.body;

  const todo = await updateTodo(id, { title, description, isChecked });

  return res.json(todo);
};

export const deleteTodoHandle = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteTodo(id);

  return res.json([]);
};
