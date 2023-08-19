import calculate from "../../utils/calculus";
import { CalculusRepositoryInterface, QueryHistory } from "../types";

class CalculusService {

  constructor(protected calculusRepo: CalculusRepositoryInterface) {}
  
  async getUserHistory(ip: string): Promise<Array<QueryHistory>> {
    const userHistory = await this.calculusRepo.getHistory(ip);
    return userHistory;
  }
  
  async calculate(query: string, ip: string): Promise<number> {
    const startTime  = performance.now();
    let result = calculate(query);
    let timeTaken  = performance.now() - startTime;
    const calcResult = await this.calculusRepo.save(ip, query, result, timeTaken);
    if (calcResult == true) {
      return result;
    }
    throw new Error("An Error occurred");
  }
}

export default CalculusService