import { QueryHistory } from "../types";

export interface CalculusRepositoryInterface {

  getHistory(ip: string, limit: number, skip: number): Promise<Array<QueryHistory>>;

  save(ip: string, query: string, result: number, timeTaken: number): Promise<boolean>;

}