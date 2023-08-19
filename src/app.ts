import "reflect-metadata";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api/calculus';
import middlewares from './middlewares';
import { AppDataSource } from "./config/db";
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '15MB' }));

//setup db connection
const DB = AppDataSource({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  type: process.env.DB_CONNECTION as string,
});

DB.initialize().then(() => {
  console.log("Database running...");
}).catch((error) => console.log(error));

app.use('/api', () => {

  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Bike24 Calculus API - 👋🌎🌍🌏',
    });
  });

  app.use('/calculus', () => api(DB));

});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;