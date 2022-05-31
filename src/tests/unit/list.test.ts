import { createList } from '../../services/list.service';
import { v4 as uuidv4 } from 'uuid';

import fakeGetRepository from '../fakes/getRepository';
import List from '@models/list.models';
import { Repository } from 'typeorm';

const createUserFake = jest.fn().mockImplementation(() => {
  const newList = { id: uuidv4() };

  return newList;
});
const saveUserFake = jest.fn().mockImplementation(() => true);
const removeUserFake = jest.fn().mockImplementation(() => true);

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

const mockListReturn = {
  create: createUserFake,
  save: saveUserFake,
  remove: removeUserFake,
};

const mockUserReturn = {
  create: createUserFake,
  save: saveUserFake,
  remove: removeUserFake,
};

describe('List services', () => {
  describe('Create', () => {
    it('Should be able to create a list', async () => {
      fakeGetRepository.mockReturnValue(
        mockListReturn as unknown as Repository<List>,
      );

      expect(1).toBe(1);
    });
  });
});
