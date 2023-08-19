export type DBConfig = {
  type: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
}

export type QueryHistory = {
  query: string
  result: number
  createdAt: Date
  timeTaken: number
}

export interface CalculusRepositoryInterface {

  getHistory(ip: string): Promise<Array<QueryHistory>>;

  save(ip: string, query: string, result: number, timeTaken: number): Promise<boolean>;
  
}