import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Calculus } from "../app/entity/Calculus";
import { DBConfig } from "../app/types";

const AppDataSource = (config: DBConfig) => new DataSource(
  {
    ...config, 
    entities: [Calculus], 
    synchronize: true, 
    logging: false,
  } as DataSourceOptions
);


export { AppDataSource }