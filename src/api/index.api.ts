import express, { Request, Response } from 'express';

import calculus from './calculus.api';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'B24 Calculus API - 👋🌎🌍🌏',
  });
});

router.use('/calculus', calculus);

export default router;
