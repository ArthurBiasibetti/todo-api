import { Express } from 'express';
import ListRoutes from './v1/list.routes';
import TodoRoutes from './v1/todo.routes';
import UserRoutes from './v1/user.routes';
import SessionRoutes from './v1/session.routes';

function routes(app: Express) {
  app.use('/lists', ListRoutes);
  app.use('/todo', TodoRoutes);
  app.use('/user', UserRoutes);
  app.use('/session', SessionRoutes);
}

export default routes;
