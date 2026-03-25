import { Request, Response, NextFunction } from 'express';
import { RefreshTokenRepository } from '../../modules/auth/repositories/RefreshTokenRepository'
import { LoginRepository } from '../../modules/auth/repositories/LoginRepository'
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const refreshTokenRepository = new RefreshTokenRepository()
  const loginRepository = new LoginRepository()
  const authHeader = req.headers.authorization
  const [, token] = authHeader.split(' ')
  const blacklisted = await loginRepository.getToken(token)

  //Não pode ser utilizado um token de tipo -> Refresh Token
  const chekTypeToken = await refreshTokenRepository.getRefreshToken(token);
  
  if (blacklisted || chekTypeToken) {
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