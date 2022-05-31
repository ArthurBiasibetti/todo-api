import fakeGetRepository from '../fakes/getRepository';
import bcrypt from 'bcrypt';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  IUserCreateRequest,
  updateUser,
  verifyLogin,
} from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import User from '@models/user.models';
import AppError from '@utils/AppError.utils';
import { Repository } from 'typeorm';

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

const createUserFake = jest
  .fn()
  .mockImplementation((user: IUserCreateRequest) => {
    const newUser = { ...user, id: uuidv4() };

    return newUser;
  });
const saveUserFake = jest.fn().mockImplementation(() => true);
const removeUserFake = jest.fn().mockImplementation(() => true);
const findUsersFake = jest.fn().mockReturnValue(findUserStub);
const findUserFake = jest
  .fn()
  .mockImplementation((finder: { id?: string; email?: string }) => {
    const [key] = Object.keys(finder);
    const user = findUserStub.find(
      user => user[key as 'id' | 'email'] === finder[key as 'id' | 'email'],
    );
    return user;
  });

  fakeGetRepository.mockReturnValue(
  {
    create: createUserFake,
    save: saveUserFake,
    remove: removeUserFake,
    findOne: findUserFake,
    find: findUsersFake,
  } as unknown as Repository<User>
);

describe('User Services', () => {
  describe('Create', () => {
    it('Should be able to create a new user', async () => {
      const user = await createUser({
        name: 'arthur',
        email: 'arthur@gmail.com',
        password: '123',
      });

      expect(createUserFake).toBeCalledTimes(1);
      expect(user).toHaveProperty('id');
      expect(saveUserFake).toBeCalledTimes(1);
    });

    it('Should throw Error if not exist password', async () => {
      await expect(
        createUser({
          name: 'arthur',
          email: 'arthur@gmail.com',
          password: '',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('Find', () => {
    it('Should be able to find users', async () => {
      const users = await findUsers();

      expect(findUsersFake).toBeCalledTimes(1);
      expect(users).toEqual(findUserStub);
    });

    it('Should be able to find an user', async () => {
      const user = await findUser(findUserStub[0].id);

      expect(findUserFake).toBeCalledTimes(1);
      expect(user).toEqual(findUserStub[0]);
    });
  });

  describe('Verify login', () => {
    it('Should pass on the verification', async () => {
      const user = await verifyLogin('art@gmail.com', '123');

      expect(findUserFake).toBeCalledTimes(1);
      expect(user).toEqual(findUserStub[0]);
    });

    it('Should not pass on the verification, email fail', async () => {
      await expect(verifyLogin('erro@gmail.com', '123')).rejects.toBeInstanceOf(
        AppError,
      );

      await expect(verifyLogin('erro@gmail.com', '123')).rejects.toThrowError(
        'Invalid Email or Password',
      );

      expect(findUserFake).toBeCalledTimes(2);
    });

    it('Should not pass on the verification, password fail', async () => {
      await expect(verifyLogin('art@gmail.com', '888')).rejects.toBeInstanceOf(
        AppError,
      );

      await expect(verifyLogin('art@gmail.com', '888')).rejects.toThrowError(
        'Invalid Email or Password',
      );

      expect(findUserFake).toBeCalledTimes(2);
    });
  });

  describe('update', () => {
    it('Should be able to update user', async () => {
      const user = await updateUser('7dbfb38c-ec0e-4060-86eb-4eefc571231c', {
        name: 'arthur',
        email: 'arthur@gmail.com',
      });

      expect(user).toEqual({
        ...findUserStub[0],
        name: 'arthur',
        email: 'arthur@gmail.com',
      });

      expect(saveUserFake).toBeCalledTimes(1);
    });

    it('Should be able to update user password', async () => {
      const spyBcrypt = jest.spyOn(bcrypt, 'hash');

      const user = await updateUser('7dbfb38c-ec0e-4060-86eb-4eefc571231c', {
        password: '888',
      });

      expect(spyBcrypt).toBeCalledTimes(1);

      expect(saveUserFake).toBeCalledTimes(1);
    });

    it('Should not find user', async () => {
      await expect(
        updateUser('7dbfb38c-ec0e-4060-86eb-4eefc5711ads', {
          name: 'arthur',
          email: 'arthur@gmail.com',
        }),
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updateUser('7dbfb38c-ec0e-4060-86eb-4eefc5711ads', {
          name: 'arthur',
          email: 'arthur@gmail.com',
        }),
      ).rejects.toThrowError('User not exist!');

      expect(findUserFake).toBeCalledTimes(2);
    });
  });

  describe('Delete', () => {
    it('Should be able to delete an user', async () => {
      await deleteUser('7dbfb38c-ec0e-4060-86eb-4eefc571231c');

      expect(findUserFake).toBeCalledTimes(1);

      expect(removeUserFake).toBeCalledTimes(1);
    });

    it('Should not be able to delete an user, fail on user id', async () => {
      await expect(
        deleteUser('7dbfb38c-ec0e-4060-86eb-4eefc5711ads'),
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        deleteUser('7dbfb38c-ec0e-4060-86eb-4eefc5711ads'),
      ).rejects.toThrowError('User not exist!');

      expect(findUserFake).toBeCalledTimes(2);
    });
  });
});
