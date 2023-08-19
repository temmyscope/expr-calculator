import { Calculus } from "../entity/Calculus";
import { DataSource, Repository } from "typeorm";
import { CalculusRepositoryInterface, QueryHistory } from "../types";

class CalculusRepository implements CalculusRepositoryInterface{
  protected entity: Repository<Calculus>;

  constructor(protected source: DataSource) {
    this.entity = source.getRepository(Calculus);
  }

  async getHistory(ip: string): Promise<QueryHistory[]> {
    return (await this.entity.findBy({ ip })).map(calculus => ({
      query: calculus.query, result: calculus.result,
      createdAt: calculus.createdAt, timeTaken: calculus.timeTaken
    }));
  }

  async save(ip: string, query: string, result: number, timeTaken: number): Promise<boolean> {
    const calc = new Calculus()
    calc.ip = ip;
    calc.query = query;
    calc.result = result;
    calc.timeTaken = timeTaken;
    let data = await this.entity.save(calc);
    if (data.id) {
      return true
    }
    return false;
  }
}

export default CalculusRepository