import { Router } from 'express';
import {
  createSessionHandle,
  findSession,
} from '@controllers/session.controller';
import { celebrate, Joi, Segments } from 'celebrate';

import verifyAuth from 'src/middleware/verifyJWT';

const routes = Router();

routes
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required(),
      },
    }),
    createSessionHandle,
  )
  .get(verifyAuth, findSession);

export default routes;
