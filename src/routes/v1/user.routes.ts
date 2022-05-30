import { Router } from 'express';
import {
  createUserHandle,
  findUserHandle,
  findUsersHandle,
  updateUserHandle,
  deleteUserHandle,
} from '@controllers/user.controller';

import { celebrate, Joi, Segments } from 'celebrate';
import verifyAuth from 'src/middleware/verifyJWT';

const routes = Router();

routes.route('/').post(createUserHandle).get(verifyAuth, findUsersHandle);

routes
  .route('/:userId')
  .get(verifyAuth, findUserHandle)
  .put(verifyAuth, updateUserHandle)
  .delete(verifyAuth, deleteUserHandle);

export default routes;
