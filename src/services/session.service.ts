import { signJWT } from '@utils/jwt.utils';

export const createSession = (userId: string) => {
  const payload = { id: userId };

  const token = signJWT(payload, {});

  console.log(token);

  return token;
};
