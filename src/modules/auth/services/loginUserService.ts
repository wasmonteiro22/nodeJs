import { LoginRepository } from '../repositories/LoginRepository';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { LoginUserDTO } from '../dtos/loginUserSchema';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

export class loginUserService {
  private loginRepository: LoginRepository;
  private usersRepository: UsersRepository;

  constructor() {
    this.loginRepository = new LoginRepository();
    this.usersRepository = new UsersRepository;
  }

  async login(data: LoginUserDTO) {
    
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (!userAlreadyExists) {
      // O Global Error Handler vai transformar isso em um 404 not found
      throw new AppError('Este e-mail não exite.', 404);
    }

    // check user and password
    const isValid = await compare(data.password, userAlreadyExists.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined')
    }
    const token = jwt.sign(
      { userId: userAlreadyExists.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    const dataLogin = { token: token, user_id: userAlreadyExists.id };

    // 2. Persistência
    const login = await this.loginRepository.create(dataLogin);

    return {userId: userAlreadyExists.id, token : login.token};
  }
}