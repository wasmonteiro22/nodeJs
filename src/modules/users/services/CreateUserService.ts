import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { CreateUserDTO } from '../dtos/createUserSchema';
import bcrypt from 'bcryptjs';
import { emailQueue } from '../../../shared/queue/emailQueue';

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

    data.password = await bcrypt.hash(data.password, 8)

    // 2. Persistência
    const user = await this.usersRepository.create(data);

    // Queue -> Envia e-mail para o usuário de boas vindas - Simulação de Fila utilizando Worker / Redis / BullMQ
    await emailQueue.add('send-email', {
      email: user.email,
      type: 'Bem Vindo!',
      msg: '<p>Olá <strong>'+user.name+' </strong>, seu acesso foi criado com sucesso!</p>'
    });

    return user;
  }
}