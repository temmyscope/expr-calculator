import "reflect-metadata";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api/index';
import middlewares from './middlewares';
import { AppDataSource } from "./config/db";
import express from 'express';

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '15MB' }));

//setup db sync
AppDataSource.initialize().then(() => {
}).catch((error) => console.log(error));

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;