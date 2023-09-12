import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/APIError';
import { ZodError } from 'zod';

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error) {
    if (error instanceof ZodError) {
      const response = error.flatten();

      return res.status(400).json(response);
    }

    if (error instanceof APIError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json(error);
  } else next();
}
