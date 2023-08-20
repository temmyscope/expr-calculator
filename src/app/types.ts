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