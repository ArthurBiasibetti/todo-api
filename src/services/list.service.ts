import List from '@models/list.models';
import AppError from '@utils/AppError.utils';
import { getRepository } from 'typeorm';

interface IListRequest {
  title: string;
}

export const createList = async ({ title }: IListRequest) => {
  const listRepository = getRepository(List);

  const list = listRepository.create({ title });

  await listRepository.save(list);

  return list;
};

export const findLists = async () => {
  const listRepository = getRepository(List);

  const lists = await listRepository.find({
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
