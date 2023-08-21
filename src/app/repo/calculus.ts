import { Calculus } from "../entity/Calculus";
import { DataSource, Repository } from "typeorm";
import { CalculusRepositoryInterface, QueryHistory } from "../types";

class CalculusRepository implements CalculusRepositoryInterface{
  protected entity: Repository<Calculus>;

  constructor(protected source: DataSource) {
    this.entity = source.getRepository(Calculus);
  }

  async getHistory(ip: string): Promise<QueryHistory[]> {
    return (await this.entity.createQueryBuilder("calculus")
    .select([
      "calculus.query", 
      "calculus.result", 
      "calculus.timeTaken", 
      "calculus.createdAt"
    ]).where("calculus.ip = :ip", { ip })
    .orderBy("calculus.createdAt", "DESC")
    .limit(5).getMany());
  }

  async save(ip: string, query: string, result: number, timeTaken: number): Promise<boolean> {
    const calc = new Calculus()
    calc.ip = ip;
    calc.query = query;
    calc.result = result;
    calc.timeTaken = timeTaken;
    let data = await this.entity.save(calc);
    console.log(data)
    if (data.id) {
      return true
    }
    return false;
  }
}

export default CalculusRepository