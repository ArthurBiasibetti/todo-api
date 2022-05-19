import { Router } from 'express';
import {
  createUserHandle,
  findUserHandle,
  findUsersHandle,
  updateUserHandle,
  deleteUserHandle,
} from '@controllers/user.controller';

import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();

routes.route('/').post(createUserHandle).get(findUsersHandle);

routes
  .route('/:userId')
  .get(findUserHandle)
  .put(updateUserHandle)
  .delete(deleteUserHandle);

export default routes;
