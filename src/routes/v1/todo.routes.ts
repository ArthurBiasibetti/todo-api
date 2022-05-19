import { Router } from 'express';
import {
  createTodoHandle,
  deleteTodoHandle,
  findTodoHandle,
  findTodosHandle,
  updateTodoHandle,
} from '@controllers/todo.controller';

import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();

routes.route('/').get(findTodosHandle);

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
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    findTodoHandle,
  )
  .put(
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
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    deleteTodoHandle,
  );

export default routes;
