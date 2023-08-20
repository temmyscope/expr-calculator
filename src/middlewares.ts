import { Request, Response, NextFunction } from 'express';

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  if (statusCode !== 500) {
    res.json({ message: err.message, error: true });
  }else{
    (req as any).error = err;
  }
}

export default { notFound, errorHandler };