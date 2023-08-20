import "reflect-metadata";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import * as path from 'path';
import api from './api/index';
import * as fs from 'graceful-fs';
import middlewares from './middlewares';
import { AppDataSource } from "./config/db";
import express from 'express';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '15MB' }));

//setup db connection
AppDataSource.initialize().then(() => {
}).catch((error) => console.log(error));

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// only run in production
const errorLogFormat    = ":requestId :status :req[error]";
app.use(morgan(errorLogFormat, {
  skip: function (req, res) { return res.statusCode < 500 },
  stream: fs.createWriteStream(path.join(__dirname, 'errors.log'), { flags: 'a' })
}));

export default app;