import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { createUserSchema } from '../dtos/createUserSchema';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    // Validação imediata com Zod
    const validatedData = createUserSchema.parse(req.body);

    const createUserService = new CreateUserService();
    
    const user = await createUserService.execute(validatedData);

    return res.status(201).json(user);
  }
}