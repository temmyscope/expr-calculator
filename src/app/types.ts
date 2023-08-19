export type QueryHistory = {
  query: string
  result: number
  createdAt: string
  timeTaken: number
}

export interface CalculusRepositoryInterface {

  getHistory(ip: string): Array<QueryHistory>;

  save(ip: string, query: string, result: number, timeTaken: number): boolean;
  
}