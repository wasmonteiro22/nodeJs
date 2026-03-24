import { Request, Response } from 'express';
import { loginUserService } from '../services/loginUserService';
import { loginUserSchema } from '../dtos/loginUserSchema';
import { prisma } from '../../../database/prisma';

export class AuthController {
  
  // LOGIN
  async login(req: Request, res: Response) {
    const validatedData = loginUserSchema.parse(req.body);
    const service = new loginUserService();
    const login = await service.login(validatedData);
    return res.status(200).json(login);
  }

  // LOGOUT
  async logout(req: Request, res: Response) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(400).json({ message: 'Token missing' })
    }

    const [, token] = authHeader.split(' ')

    await prisma.TokenBlacklist.create({
      data: { token }
    })

    return res.json({ message: 'Logout realizado' })
  }

}