import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { CreateUserDTO } from '../dtos/createUserSchema';

export class CreateUserService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(data: CreateUserDTO) {
    // 1. Regra: Não pode haver e-mails duplicados
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      // O Global Error Handler vai transformar isso em um 409 Conflict
      throw new AppError('Este e-mail já está cadastrado em nossa base.', 409);
    }

    // 2. Persistência
    const user = await this.usersRepository.create(data);

    return user;
  }
}