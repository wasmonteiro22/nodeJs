import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../database/prisma';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  const [, token] = authHeader.split(' ')
  const blacklisted = await prisma.TokenBlacklist.findFirst({
    where: { token }
  })

  if (blacklisted) {
    return res.status(401).json({ message: 'Token invalidated or expired!' })
  }

  if (!authHeader) {
    return res.status(res.statusCode).json({
      status: 'error',
      message: 'Token missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as any
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }

}