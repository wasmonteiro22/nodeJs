import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserService } from '../services/GetUserService';
import { createUserSchema } from '../dtos/createUserSchema';
import { showUserSchema } from '../dtos/showUserSchema';
import { AppError } from '../../../shared/errors/AppError';

export class UserController {
  // CREATE
  async handle(req: Request, res: Response) {
    const validatedData = createUserSchema.parse(req.body);
    const service = new CreateUserService();
    const user = await service.execute(validatedData);
    return res.status(201).json(user);
  }

  // READ (Find by ID)
  async show(req: Request, res: Response) {
    const { email } = req.params;

    if (typeof email !== 'string') {
      throw new AppError('E-mail inválido.', 400);
    }

    const validatedData = showUserSchema.parse({ email });
     
    const service = new GetUserService();
    const user = await service.GetUser(validatedData.email);
    return res.json(user);
  }

  // LIST (Find All)
  async index(req: Request, res: Response) {
    // Lógica para listar todos...
  }
}