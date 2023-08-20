import express, { NextFunction, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import CalculusRepository from "../app/repo/calculus";
import CalculusService from "../app/services/calculus";
import { InvalidOperationException } from '../app/exception';
import { AppDataSource } from '../config/db';

const router = express.Router();

const calcRepo = new CalculusRepository(AppDataSource);
const calculusService = new CalculusService(calcRepo);

router.get('/', query('query').notEmpty().isBase64(), async(req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json(
      { error: true, message: result.array()}
    );
  }
  try {
    const result = await calculusService.calculate(
      Buffer.from(req.query.query as string, 'base64').toString('utf8'), req.ip
    );
    return res.status(200).json({ "error": false, "result": result });
  } catch (e) {
    if (e instanceof InvalidOperationException) {
      res.status(422);
    } else {
      res.status(500);
    }
    next(e);
  }
});

router.get('/history', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await calculusService.getUserHistory(req.ip);
    return res.status(200).json({ data: history });
  } catch (e) {
    res.status(500);
    next(e);
  }
});

export default router;