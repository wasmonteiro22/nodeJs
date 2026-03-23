import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';

export class GetAllUsersService {
  private usersRepository: UsersRepository;
  
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getAllUsers() {
    const users = await this.usersRepository.findAll();

    if (!users) {
      // O Global Error GetUser vai transformar isso em um 404 not Found
      throw new AppError('Nenhum registro foi encontrado na nossa base.', 404);
    }

    return users;
  }
}