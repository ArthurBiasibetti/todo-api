import { Request, Response } from 'express';
import {
  createList,
  deleteList,
  findList,
  findLists,
  updateList,
} from '../services/list.service';

export const createListHandle = async (req: Request, res: Response) => {
  const { title } = req.body;
  const { userId } = req.params;

  const list = await createList(userId, { title });

  return res.json(list);
};

export const getListsHandle = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const lists = await findLists(userId);

  return res.json(lists);
};

export const getListHandle = async (req: Request, res: Response) => {
  const { id } = req.params;

  const list = await findList(id);

  return res.json(list);
};

export const updateListHandle = async (req: Request, res: Response) => {
  const { title } = req.body;
  const { id } = req.params;

  const list = await updateList(id, { title });

  return res.json(list);
};

export const deleteListHandle = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteList(id);

  return res.json([]);
};
