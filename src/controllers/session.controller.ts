import config from '@config/config';
import AppError from '@utils/AppError.utils';
import { verifyJwt } from '@utils/jwt.utils';
import { Request, Response } from 'express';
import {
  createSession,
  createRefreshToken,
} from 'src/services/session.service';
import { verifyLogin } from 'src/services/user.service';

export const createSessionHandle = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await verifyLogin(email, password);

  const token = createSession(user.id);

  res.set('authorization', token);
  res.status(204).send();
};

export const findSession = async (req: Request, res: Response) => {
  return res.json({ message: 'Auth pass!' });
};
