import express, { Request, Response } from 'express';

import calculus from './calculus';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Bike24 Calculus API - 👋🌎🌍🌏',
  });
});

router.use('/calculus', calculus);

export default router;