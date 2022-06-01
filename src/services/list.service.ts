import List from '@models/list.models';
import User from '@models/user.models';
import AppError from '@utils/AppError.utils';
import { getRepository } from 'typeorm';
import { findUser } from './user.service';

interface IListRequest {
  title: string;
}

export const createList = async (userId: string, { title }: IListRequest) => {
  const listRepository = getRepository(List);

  const user = await findUser(userId);

  if (!user) {
    throw new AppError('User not exist!');
  }

  const list = listRepository.create({ title, user });

  await listRepository.save(list);

  return list;
};

export const findLists = async (userId: string) => {
  const listRepository = getRepository(List);

  const user = await findUser(userId);

  if (!user) {
    throw new AppError('User not Found!');
  }

  const lists = await listRepository.find({
    where: {
      user: user,
    },
    order: {
      createdAt: 'DESC',
    },
    relations: ['todos'],
  });

  return lists;
};

export const findList = async (id: string) => {
  const listRepository = getRepository(List);

  const lists = await listRepository.findOne({ id }, { relations: ['todos'] });

  return lists;
};

export const updateList = async (id: string, { title }: IListRequest) => {
  const listRepository = getRepository(List);

  const list = await listRepository.findOne(id);

  if (!list) {
    throw new AppError('List not exist');
  }

  list.title = title;

  await listRepository.save(list);

  return list;
};

export const deleteList = async (id: string) => {
  const listRepository = getRepository(List);

  const list = await listRepository.findOne(id);

  if (!list) {
    throw new AppError('List not exist');
  }

  await listRepository.remove(list);
};
