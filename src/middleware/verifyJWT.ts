import AppError from '@utils/AppError.utils';
import { verifyJwt } from '@utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ICustomRequest extends Request {
  auth?: {
    valid: boolean;
    expired: boolean;
    decoded: string | JwtPayload | null;
  };
}

const verifyAuth = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    throw new AppError('Missing token to Authentication!', 401);
  }

  const [hashType, hash] = bearerHeader?.split(' ');

  const auth = verifyJwt(hash);

  if (!auth.valid) {
    throw new AppError('Authentication Failed!', 401);
  }

  req.auth = auth;
  next();
};

export default verifyAuth;
