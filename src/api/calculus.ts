import express, { Request, Response } from 'express';
import CalculusRepository from "../app/repo/calculus";
import CalculusService from "../app/services/calculus";

const router = express.Router();

const calculusController = (dataSource: any) => {

  const calcRepo = new CalculusRepository(dataSource);
  const userService = new CalculusService(calcRepo);
  
  router.get('/', (req: Request, res: Response) => {
    
    res.json(['apis are lovely']);
  });
  
  router.get('/history', (req: Request, res: Response) => {
    res.json(['Emojis are stupid']);
  });

  return router;
}

export default calculusController;