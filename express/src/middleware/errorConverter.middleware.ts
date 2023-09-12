import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/APIError';
import { ZodError } from 'zod';

const errorConverter = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    next(error);
  } else {
    if (!(error instanceof APIError)) {
      console.log('nu e api error');
      const statusCode = error.statusCode || 500;

      const message = error.message || statusCode;

      error = new APIError({ statusCode, message, stack: error.stack });
    }
    next(error);
  }
};

export default errorConverter;
