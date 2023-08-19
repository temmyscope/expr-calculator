//import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api';
import middlewares from './middlewares';

dotenv.config({ path: '../.env' });

const app = express();

app.use(morgan('dev'));
app.use(helmet());
//app.use(cors());
app.use(express.json({ limit: '15MB' }));


app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;