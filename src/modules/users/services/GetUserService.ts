import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';

export class GetUserService {
  private usersRepository: UsersRepository;
  
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async GetUser(email: string) {
    // 1. Regra: Não pode haver e-mails duplicados
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      // O Global Error GetUser vai transformar isso em um 404 not Found
      throw new AppError('Este email não foi encontrado na nossa base.', 404);
    }

    return userAlreadyExists;
  }
}