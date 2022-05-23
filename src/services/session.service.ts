import config from '@config/config';
import { signJWT } from '@utils/jwt.utils';

export const createSession = (userId: string) => {
  const payload = { id: userId };

  const token = signJWT(payload, { expiresIn: config.accessTokenTtl });

  return token;
};

export const createRefreshToken = (userId: string) => {
  const payload = { id: userId };

  const refreshToken = signJWT(payload, { expiresIn: config.refreshTokenTtl });

  return refreshToken;
};
