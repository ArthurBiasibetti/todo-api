import { Router } from 'express';
import {
  createTodoHandle,
  deleteTodoHandle,
  findTodoHandle,
  findTodosHandle,
  updateTodoHandle,
} from '@controllers/todo.controller';

import { celebrate, Joi, Segments } from 'celebrate';
import verifyAuth from 'src/middleware/verifyJWT';

const routes = Router();

routes.route('/').get(verifyAuth, findTodosHandle);

routes.route('/list/:listId').post(
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
    },
    [Segments.PARAMS]: {
      listId: Joi.string().uuid().required(),
    },
  }),
  createTodoHandle,
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
    findTodoHandle,
  )
  .put(
    verifyAuth,
    celebrate({
      [Segments.BODY]: {
        title: Joi.string(),
        description: Joi.string(),
        isChecked: Joi.boolean(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    updateTodoHandle,
  )
  .delete(
    verifyAuth,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    deleteTodoHandle,
  );

export default routes;
