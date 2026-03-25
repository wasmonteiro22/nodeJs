import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  // 1. Se for um erro que nós lançamos propositalmente
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // 2. Se for um erro de validação do Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'validation_error',
      issues: err.format(),
    });
  }

  // 3. Erro desconhecido (Logue isso para o desenvolvedor!)
  console.error('CRITICAL ERROR:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}