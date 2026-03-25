import { UsersRepository } from '../../users/repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { LoginUserDTO } from '../dtos/loginUserSchema';
import { RefreshTokenService } from './RefreshTokenService';
import { compare } from 'bcryptjs';

export class loginUserService {
  private usersRepository: UsersRepository;
  private refreshTokenService: RefreshTokenService;

  constructor() {
    this.usersRepository = new UsersRepository;
    this.refreshTokenService = new RefreshTokenService;
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
    
    return this.refreshTokenService.refreshToken( null, userAlreadyExists.id, false);
  }
}