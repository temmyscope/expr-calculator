import express, { NextFunction, Request, Response } from 'express';
import CalculusRepository from "../app/repo/calculus";
import CalculusService from "../app/services/calculus";
import { InvalidOperationException } from '../app/exception';
import { AppDataSource } from '../config/db';

const router = express.Router();

const calcRepo = new CalculusRepository(AppDataSource);
const calculusService = new CalculusService(calcRepo);

router.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await calculusService.calculate(
      Buffer.from(req.query.query as string, 'base64').toString('utf8'), req.ip
    );
    res.json({ "error": false, "result": result });
  } catch (e) {
    if (e instanceof InvalidOperationException) {
      res.status(422);
    } else {
      res.status(500);
    }
    next(e);
  }
});

router.get('/history', (req: Request, res: Response) => {
  res.json(['Emojis are stupid']);
});

export default router;