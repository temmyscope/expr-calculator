import { QueryHistory } from "../types";

export interface CalculusServiceInterface {
  
  getUserHistory(ip: string): Promise<Array<QueryHistory>>

  calculate(query: string, ip: string): Promise<number>
}