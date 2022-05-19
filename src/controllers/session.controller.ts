import AppError from '@utils/AppError.utils';
import { Request, Response } from 'express';
import { createSession } from 'src/services/session.service';
import { findUser } from 'src/services/user.service';

export const createSessionHandle = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await findUser(userId);

  if (!user) {
    throw new AppError('User invalid!');
  }

  const token = createSession(userId);

  res.set('Authorization', token);
  res.status(204).send();
};
