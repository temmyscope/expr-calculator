import {
  Get, Route, Inject, Query, Example, Request,
} from 'tsoa';
import { decodeExpr, isValidExpr } from '../../utils/calculus';
import { AppDataSource } from '../../config/db';
import { InvalidOperationException } from '../exception/invalid';
import CalculusService from '../services/calculus.service'
import { QueryHistory } from '../types';
import CalculusRepository from '../repo/calculus.repository';

@Route('/api/calculus')
class CalculusController {
  protected calculusService: CalculusService;

  constructor() {
    let repository = new CalculusRepository(AppDataSource);

    this.calculusService = new CalculusService(repository);
  }

  /**
   * Get User Calculus History
   * @param ip
   * @param {number} limit
   * @param {number} skip
   * @returns {Promise<Array<QueryHistory>>}
   */
  @Get('/history')
  async getHistory(
    @Inject() ip: string,
    @Inject() limit: number,
    @Inject() skip = 0,
  ): Promise<Array<QueryHistory>> {
    const userHistory = await this.calculusService.getUserHistory(ip, limit, skip);
    return userHistory;
  }

  /**
   * Evaluate expression
   * @param {string} query - encoded expression
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
    let expression = decodeExpr(query);
    if (isValidExpr(expression)) {
      return this.calculusService.calculate(decodeExpr(expression), ip);
    }
    throw new InvalidOperationException();
  }
}

export default CalculusController;
