import { Request, Response } from 'express';
import { loginUserService } from '../services/LoginUserService';
import { RefreshTokenService } from '../services/RefreshTokenService';
import { loginUserSchema } from '../dtos/loginUserSchema';
import { LoginRepository } from '../repositories/LoginRepository'
import { AppError } from '../../../shared/errors/AppError';
import jwt from 'jsonwebtoken';

export class AuthController {
  
  // LOGIN
  async login(req: Request, res: Response) {
    const validatedData = loginUserSchema.parse(req.body);
    const service = new loginUserService();
    const login = await service.login(validatedData);
    return res.status(200).json(login);
  }
  
  // LOGIN
  async refreshToken(req: Request, res: Response) {
    const refreshTokenHeader = req.headers.authorization
    if (!refreshTokenHeader) {
      throw new AppError('Refresh token não informado', 401)
    }
    
    const [, token] = refreshTokenHeader.split(' ')
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as any
    const userId = decoded.userId
    
    const service = new RefreshTokenService();    
    const data = await service.refreshToken(token, userId);
    return res.status(200).json(data);
  }

  // LOGOUT
  async logout(req: Request, res: Response) {
    const repository = new LoginRepository();
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      return res.status(400).json({ message: 'Token missing' })
    }
    
    const [, token] = authHeader.split(' ')
    
    await repository.create({
      data: { token }
    })

    return res.json({ message: 'Logout realizado' })
  }

}