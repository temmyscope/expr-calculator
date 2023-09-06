import express, { NextFunction, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import CalculusController from '../app/controller/calculus.controller';
import { InvalidOperationException } from '../app/exception/invalid';

const router = express.Router();

const calcController = new CalculusController();

router.get(
  '/',
  query('query').notEmpty().isBase64(),
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json(
        { error: true, message: result.array() },
      );
    }

    try {
      const result = await calcController.calculate(
        req.query.query as string, req.ip,
      );
      return res.status(200).json({ error: false, result });
    } catch (e) {
      if (e instanceof InvalidOperationException) {
        res.status(422);
      } else {
        res.status(500);
      }
      next(e);
    }

  },
);

router.get('/history', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await calcController.getHistory(req.ip, 5, 0);
    return res.status(200).json({ data: history });
  } catch (e) {
    res.status(500);
    next(e);
  }
});

export default router;
