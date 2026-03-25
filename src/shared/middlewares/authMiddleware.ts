import { Request, Response, NextFunction } from 'express';
import { RefreshTokenRepository } from '../../modules/auth/repositories/RefreshTokenRepository'
import { LoginRepository } from '../../modules/auth/repositories/LoginRepository'
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/@types/JwtPayload';

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
    req.user = decoded as JwtPayload
    return next()
  } catch (err: any) {
    
    // 1. Verifica se o erro é especificamente de expiração
    if (err.name === 'TokenExpiredError') {
      //console.log("O token expirou!");
      return res.status(401).json({ 
        error: 'token.expired', 
        message: 'Sua sessão expirou, faça login novamente.' 
      });
    }

    // 2. Trata outros erros de JWT (token malformado, assinatura inválida, etc)
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'token.invalid', 
        message: 'Token inválido.' 
      });
    }
    return res.status(401).json({ message: err.message })
  }

}