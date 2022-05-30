import List from '@models/list.models';
import User from '@models/user.models';

import { getRepository } from 'typeorm';

import bcrypt from 'bcrypt';
import AppError from '@utils/AppError.utils';
import config from '@config/config';
import cleanObject from '@utils/cleanObject.utils';

export interface IUserCreateRequest {
  name: string;
  password: string;
  email: string;
}

export interface IUserUpdateRequest {
  name?: string;
  password?: string;
  email?: string;
}

export const createUser = async ({
  name,
  email,
  password,
}: IUserCreateRequest) => {
  const userRepository = getRepository(User);

  if (!password) {
    throw new AppError('password is required!');
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export const findUser = async (id: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ id });

  return user;
};

export const findUsers = async () => {
  const userRepository = getRepository(User);

  const users = await userRepository.find({ order: { createdAt: 'DESC' } });

  return users;
};

export const verifyLogin = async (email: string, password: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ email });

  if (!user) {
    throw new AppError('Invalid Email or Password', 401);
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw new AppError('Invalid Email or Password', 401);
  }

  return user;
};

export const updateUser = async (
  id: string,
  userUpdated: IUserUpdateRequest,
) => {
  const userRepository = getRepository(User);

  const cleanedUserObj = (await cleanObject(userUpdated)) as IUserUpdateRequest;

  if (cleanedUserObj.password) {
    const salt = await bcrypt.genSalt(config.saltWorkFactor);
    cleanedUserObj.password = await bcrypt.hash(cleanedUserObj.password, salt);
  }

  const user = await userRepository.findOne({ id });

  if (!user) {
    throw new AppError('User not exist!');
  }

  const newUser = { ...user, ...cleanedUserObj };

  userRepository.save(newUser);

  return newUser;
};

export const deleteUser = async (id: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ id });

  if (!user) {
    throw new AppError('User not exist!');
  }

  await userRepository.remove(user);
};
