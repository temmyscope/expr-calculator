import express, { Request, Response } from 'express';
import CalculusRepository from "../app/repo/calculus";
import CalculusService from "../app/services/calculus";

const router = express.Router();

const calculusController = (dataSource: any) => {

  const calcRepo = new CalculusRepository(dataSource);
  const calculusService = new CalculusService(calcRepo);
  
  router.get('/', async(req: Request, res: Response) => {
    const { query } = req.params;
    try {
      const result = await calculusService.calculate(query, req.ip);
      res.json({ "error": false, "result": result });
    } catch (error) {
      //log error trace
      res.status(500);
    }
  });
  
  router.get('/history', (req: Request, res: Response) => {
    res.json(['Emojis are stupid']);
  });

  return router;
}

export default calculusController;