import { QueryHistory } from '../types';
import { InternalErrorException } from '../exception/internal';
import { InvalidOperationException } from '../exception/invalid';
import { CalculusRepositoryInterface } from '../interfaces/calculus.repository.interface';

class CalculusService {
  constructor(protected calculusRepo: CalculusRepositoryInterface ) {}

  /**
   * Get User Calculus History
   * @param ip
   * @param {number} limit
   * @param {number} skip
   * @returns {Promise<Array<QueryHistory>>}
   */
  async getUserHistory(
    ip: string, limit: number, skip = 0,
  ): Promise<Array<QueryHistory>> {
    const userHistory = await this.calculusRepo.getHistory(ip, limit, skip);
    return userHistory;
  }

  /**
   * Evaluate expression and save result in database
   * @param {string} query - expression
   * @param {string} ip
   *
   * @returns {Promise<number>}
   * @throws InternalErrorException
   */
  async calculate(query: string, ip: string): Promise<number> {
    const startTime = performance.now();
    const result = CalculusService.evaluate(query);
    const timeTaken = performance.now() - startTime;
    const calcResult = await this.calculusRepo.save(ip, query, result, timeTaken);
    if (calcResult == true) {
      return result;
    }
    throw new InternalErrorException();
  }

  /**
   * evaluate valid mathematical expression to 2 decimal places
   * @param {string} expr
   *
   * @throws InvalidOperationException
   * @returns
   */
  public static evaluate(expr: string): number{
    try {
      let result = Function("return "+ expr)();
      return Number(Number(result as number).toFixed(2));
    } catch (error) {
      throw new InvalidOperationException();
    }
  };
}

export default CalculusService;
