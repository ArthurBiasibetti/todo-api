import AppError from '@utils/AppError.utils';
import { verifyJwt } from '@utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    throw new AppError('Missing token to Authentication!');
  }

  const [hashType, hash] = bearerHeader?.split(' ');

  const auth = verifyJwt(hash);

  if (!auth.valid) {
    throw new AppError('Authentication Failed!');
  }

  next();
};

export default verifyAuth;
