import { createList, findList, findLists } from '../../services/list.service';
import { v4 as uuidv4 } from 'uuid';

import fakeGetRepository from '../fakes/getRepository';
import fakeUserFind from '../fakes/findUser';
import List from '@models/list.models';
import { Repository } from 'typeorm';
import AppError from '@utils/AppError.utils';
import User from '@models/user.models';
import { findUser } from 'src/services/user.service';

const findUserStub = [
  {
    id: '7dbfb38c-ec0e-4060-86eb-4eefc571231c',
    createdAt: '2022-05-27T17:41:39.794Z',
    updatedAt: '2022-05-27T17:41:39.794Z',
    name: 'art',
    email: 'art@gmail.com',
    password: '$2b$10$GRy8tg69iR9OrROFXIcLTuVH.iJP6tcteDL9ZCqQq4Mpd4BFlJ0f.',
  },
  {
    id: '5c0cf932-ff4e-4163-9033-acd2094eb3bd',
    createdAt: '2022-05-20T01:13:02.199Z',
    updatedAt: '2022-05-20T03:15:46.756Z',
    name: 'Fabio',
    email: 'Fabio@gmail.com',
    password: '$2b$10$ZVJmkgS9ZuIf.ZjSDBGK1eEI2vHJhri/eMwehW3FFZvl0lCGFtB86',
  },
];

const findListStub = [
  {
    id: '696ea535-bda9-4226-b27b-883b240d4d13',
    createdAt: '2022-05-30T03:57:46.413Z',
    updatedAt: '2022-05-30T03:57:46.413Z',
    title: 'Lista de compras',
    user: findUserStub[1],
  },
  {
    id: 'b09b6e98-35f2-40b7-9142-a1ee07f6b42e',
    createdAt: '2022-05-23T05:04:31.219Z',
    updatedAt: '2022-05-23T05:04:31.219Z',
    title: 'Lista de compras',
    user: findUserStub[1],
  },
];

const findListsFake = jest
  .fn()
  .mockImplementation(({ where }: { where: { user: { id: string } } }) => {
    const lists = findListStub.filter(list => list.user.id === where.user.id);

    return lists;
  });

const createListFake = jest.fn().mockImplementation((list: List) => {
  const newList = { ...list, id: uuidv4() };

  return newList;
});

const findListFake = jest.fn().mockImplementation((finder: { id: string }) => {
  const list = findListStub.find(list => list.id === finder.id);

  return list;
});

const saveListFake = jest.fn().mockImplementation(() => true);
const removeListFake = jest.fn().mockImplementation(() => true);

const mockListReturn = {
  create: createListFake,
  save: saveListFake,
  remove: removeListFake,
  find: findListsFake,
  findOne: findListFake,
};

fakeGetRepository.mockReturnValue(
  mockListReturn as unknown as Repository<List>,
);

fakeUserFind.mockImplementation(
  (id: string) =>
    findUserStub.find(user => user.id === id) as unknown as Promise<User>,
);

describe('List services', () => {
  describe('Create', () => {
    it('Should be able to create a list', async () => {
      const list = await createList(findUserStub[1].id, {
        title: 'Lista de salves',
      });

      expect(list.title).toBe('Lista de salves');
      expect(list).toHaveProperty('id');
      expect(list.user).toEqual(findUserStub[1]);
      expect(fakeUserFind).toBeCalledTimes(1);
      expect(createListFake).toBeCalledTimes(1);
      expect(saveListFake).toBeCalledTimes(1);
    });

    it('Should not be able to create a list', async () => {
      expect(
        createList('not-exist-user-id', {
          title: 'Lista de salves',
        }),
      ).rejects.toBeInstanceOf(AppError);

      expect(fakeUserFind).toBeCalledTimes(1);
    });
  });

  describe('Find', () => {
    it('Should be able to find user lists', async () => {
      const lists = await findLists(findUserStub[1].id);

      expect(lists).toEqual(findListStub);
    });

    it('Should find an empty array', async () => {
      const lists = await findLists(findUserStub[0].id);

      expect(lists).toEqual([]);
      expect(fakeUserFind).toBeCalledTimes(1);
      expect(findListsFake).toBeCalledTimes(1);
    });

    it('Should not be able to find user lists, user not found', async () => {
      await expect(findLists('not-exist-user-id')).rejects.toBeInstanceOf(
        AppError,
      );
      expect(fakeUserFind).toBeCalledTimes(1);
    });

    it('Should to be able to find an list', async () => {
      const list = await findList(findListStub[0].id);

      expect(list).toEqual(findListStub[0]);
      expect(findListFake).toBeCalledTimes(1);
    });
  });
});
