import { Router } from 'express';
import {
  createListHandle,
  deleteListHandle,
  getListHandle,
  getListsHandle,
  updateListHandle,
} from '@controllers/list.controller';
import { celebrate, Joi, Segments } from 'celebrate';

import verifyAuth from 'src/middleware/verifyJWT';

const routes = Router();

routes
  .route('/users/:userId')
  .get(
    verifyAuth,
    celebrate({
      [Segments.PARAMS]: {
        userId: Joi.string().uuid().required(),
      },
    }),
    getListsHandle,
  )
  .post(
    verifyAuth,
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
      },
      [Segments.PARAMS]: {
        userId: Joi.string().uuid().required(),
      },
    }),
    createListHandle,
  );

routes
  .route('/:id')
  .get(
    verifyAuth,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    getListHandle,
  )
  .put(
    verifyAuth,
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    updateListHandle,
  )
  .delete(
    verifyAuth,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    deleteListHandle,
  );

export default routes;
