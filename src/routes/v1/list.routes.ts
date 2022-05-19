import { Router } from 'express';
import {
  createListHandle,
  deleteListHandle,
  getListHandle,
  getListsHandle,
  updateListHandle,
} from '@controllers/list.controller';

import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();

routes
  .route('/')
  .get(getListsHandle)
  .post(
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
      },
    }),
    createListHandle,
  );

routes
  .route('/:id')
  .get(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    getListHandle,
  )
  .put(
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
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    deleteListHandle,
  );

export default routes;
