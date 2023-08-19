import calculate from "../../utils/calculus";
import { CalculusRepositoryInterface, QueryHistory } from "../types";

class CalculusService {

  constructor(protected calculusRepo: CalculusRepositoryInterface) {}
  
  async getUserHistory(ip: string): Promise<Array<QueryHistory>> {
    const userHistory = await this.calculusRepo.getHistory(ip);
    return userHistory;
  }
  
  async calculate(query: string, ip: string) {
    const startTime  = performance.now();
    let result = calculate(query);
    let timeTaken  = performance.now() - startTime;
    await this.calculusRepo.save(ip, query, result, timeTaken);
  }
}

export default CalculusService