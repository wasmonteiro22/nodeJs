import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';

export class DeleteUserService {
  private usersRepository: UsersRepository;
  
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async delete(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      // O Global Error GetUser vai transformar isso em um 404 not Found
      throw new AppError('Nenhum registro foi encontrado na nossa base.', 404);
    }

    return await this.usersRepository.delete(user.id);
  }
}