import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '@config/config';

export const signJWT = (payload: object, options: SignOptions | undefined) => {
  const opts = { ...options, algorithm: 'HS256' } as SignOptions;
  const token = jwt.sign(payload, config.jwtSecret as Secret, opts);

  return token;
};

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, config.jwtSecret as Secret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
