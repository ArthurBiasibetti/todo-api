import { Express, Request, Response } from 'express';
import ListRoutes from './v1/list.routes';
import TodoRoutes from './v1/todo.routes';

function routes(app: Express) {
  app.use('/lists', ListRoutes);
  app.use('/todo', TodoRoutes);
}

export default routes;
