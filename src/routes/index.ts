import { Express } from 'express';
import ListRoutes from './v1/list.routes';
import TodoRoutes from './v1/todo.routes';
import UserRoutes from './v1/user.routes';

function routes(app: Express) {
  app.use('/lists', ListRoutes);
  app.use('/todo', TodoRoutes);
  app.use('/user', UserRoutes);
}

export default routes;
