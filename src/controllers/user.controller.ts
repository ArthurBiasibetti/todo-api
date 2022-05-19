import { Request, Response } from 'express';

import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  updateUser,
} from '../services/user.service';

export const createUserHandle = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await createUser({ name, email, password });

  return res.json(user);
};

export const findUserHandle = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await findUser(userId);

  return res.json(user);
};

export const findUsersHandle = async (req: Request, res: Response) => {
  const users = await findUsers();

  return res.json(users);
};

export const updateUserHandle = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  const user = await updateUser(userId, { name, email, password });

  return res.json(user);
};

export const deleteUserHandle = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await deleteUser(userId);

  return res.json([]);
};
