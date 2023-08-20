import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm"
import { Calculus } from "../app/entity/Calculus";

dotenv.config();

const AppDataSource = new DataSource(
  { 
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    type: process.env.DB_CONNECTION as string, 
    entities: [Calculus], 
    synchronize: true, 
    logging: false,
  } as DataSourceOptions
);


export { AppDataSource }