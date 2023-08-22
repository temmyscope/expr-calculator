export type QueryHistory = {
  query: string
  result: number
  createdAt: Date
  timeTaken: number
}

export interface CalculusRepositoryInterface {

  getHistory(ip: string, limit: number, skip: number): Promise<Array<QueryHistory>>;

  save(ip: string, query: string, result: number, timeTaken: number): Promise<boolean>;
  
}

export interface CalculusServiceInterface {
  getUserHistory(ip: string): Promise<Array<QueryHistory>>

  calculate(query: string, ip: string): Promise<number>
}