import { DataSource, Repository } from 'typeorm';
import { Calculus } from '../entity/calculus.entity';
import { QueryHistory } from '../types';
import { CalculusRepositoryInterface } from '../interfaces/calculus.repository.interface';

class CalculusRepository implements CalculusRepositoryInterface {
  protected entity: Repository<Calculus>;

  constructor(protected source: DataSource) {
    this.entity = source.getRepository(Calculus);
  }

  /**
   * fetch user's calculus history
   * @param ip
   * @param {number} limit
   * @param {number} skip - number of items to skip
   * @returns
   */
  async getHistory(ip: string, limit: number, skip: number): Promise<QueryHistory[]> {
    return (await this.entity.createQueryBuilder('calculus')
      .select([
        'calculus.query',
        'calculus.result',
        'calculus.timeTaken',
        'calculus.createdAt',
      ]).where('calculus.ip = :ip', { ip })
      .orderBy('calculus.createdAt', 'DESC')
      .skip(skip)
      .limit(limit)
      .getMany());
  }

  /**
   * save details of calculation for user based on ip
   *
   * @param {string} ip
   * @param {string} query
   * @param {number} result
   * @param {number} timeTaken
   * @returns
   */
  async save(ip: string, query: string, result: number, timeTaken: number): Promise<boolean> {
    const calc = new Calculus();
    calc.ip = ip;
    calc.query = query;
    calc.result = result;
    calc.timeTaken = timeTaken;
    const data = await this.entity.save(calc);
    if (data.id) {
      return true;
    }
    return false;
  }
}

export default CalculusRepository;
