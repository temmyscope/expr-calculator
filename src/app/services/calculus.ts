import {
  Get, Route, Inject, Query, Example, Request,
} from 'tsoa';
import calculate from '../../utils/calculus';
import { InternalErrorException } from '../exception';
import { CalculusRepositoryInterface, QueryHistory } from '../types';

@Route('/api/calculus')
class CalculusService {
  constructor(protected calculusRepo: CalculusRepositoryInterface) {}

  /**
   * Get User Calculus History
   * @param ip
   * @param {number} limit
   * @param {number} skip
   * @returns {Promise<Array<QueryHistory>>}
   */
  @Get('/history')
  async getUserHistory(
    @Inject() ip: string,
    @Inject() limit: number,
    @Inject() skip = 0,
  ): Promise<Array<QueryHistory>> {
    const userHistory = await this.calculusRepo.getHistory(ip, limit, skip);
    return userHistory;
  }

  /**
   * Evaluate expression
   * @param {string} query - expression
   * @param {string} ip
   *
   * @returns {Promise<number>}
   * @throws InternalErrorException
   */
  @Example({
    error: false,
    result: -132.89,
  })
  @Get('/')
  async calculate(@Query('query') query: string, @Inject() ip: string): Promise<number> {
    const startTime = performance.now();
    const result = calculate(query);
    const timeTaken = performance.now() - startTime;
    const calcResult = await this.calculusRepo.save(ip, query, result, timeTaken);
    if (calcResult == true) {
      return result;
    }
    throw new InternalErrorException();
  }
}

export default CalculusService;
