import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from './utils/AppError.utils';
import { errors } from 'celebrate';
import './utils/typeorm';

const corsOptions = {
  exposedHeaders: ['authorization', 'refresh'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

routes(app);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server error',
  });
});

app.listen(3333, () => {
  console.log('Server Started on port 3333! 🏆');
});
