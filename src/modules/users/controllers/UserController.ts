import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserService } from '../services/GetUserService';
import { UpdateUserService } from '../services/UpdateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';
import { DeleteUserService } from '../services/DeleteUserService';
import { createUserSchema } from '../dtos/createUserSchema';
import { updateUserSchema } from '../dtos/updateUserSchema';
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
  async getAll(req: Request, res: Response) {
    const service = new GetAllUsersService();
    const user = await service.getAllUsers();
    return res.json(user);
  }

  // DELETE user
  async delete(req: Request, res: Response) {
    const { email } = req.params;

    if (typeof email !== 'string') {
      throw new AppError('E-mail inválido.', 400);
    }

    const validatedData = showUserSchema.parse({ email });
     
    const service = new DeleteUserService();
    await service.delete(validatedData.email);
    return res.status(204).send();
  }

  //UPDATE user
  async update(req: Request, res: Response) {
    const data = updateUserSchema.parse(req.body);

    if (typeof data.email !== 'string') {
      throw new AppError('E-mail inválido.', 400);
    }

    const service = new UpdateUserService();
    const user = await service.updateUser(data);
    return res.json(user);
  }
}