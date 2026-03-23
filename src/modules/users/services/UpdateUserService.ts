import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { updateUserDTO } from '../dtos/updateUserSchema';

export class UpdateUserService {
  private usersRepository: UsersRepository;
  
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async updateUser(data: updateUserDTO) {
    
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (!userAlreadyExists) {
      // O Global Error GetUser vai transformar isso em um 404 not Found
      throw new AppError('Este email não foi encontrado na nossa base.', 404);
    }

    const user = await this.usersRepository.update(data);

    return user;
  }
}