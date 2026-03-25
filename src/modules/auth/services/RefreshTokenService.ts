import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository';
import { AppError } from '../../../shared/errors/AppError';
import { Util } from '../../../shared/utils/Util';
import jwt from 'jsonwebtoken';

export class RefreshTokenService {
  private refreshTokenRepository: RefreshTokenRepository;
  
  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  async refreshToken(refreshToken: String, userId?: null, validate: boolean = true) {
    
    let tokenExists = false;
    let tokenAlreadyExists = null;

    if(validate) {
      tokenAlreadyExists = await this.refreshTokenRepository.getRefreshToken(refreshToken);
  
      if (!tokenAlreadyExists) {
        // O Global Error Handler vai transformar isso em um 401 não autorizado
        throw new AppError('Este token é inválido.', 401);
      }
  
      // --- COMPARAÇÃO DE EXPIRAÇÃO ---
      // Assumindo que 'expiredIn' no banco seja um objeto Date ou ISOString
      const now = new Date();
      const expirationDate = new Date(tokenAlreadyExists.expiredIn);

      if (expirationDate < now) {

        await this.refreshTokenRepository.delete(token)

        throw new AppError('Este refresh token expirou. Faça login novamente.', 401);
      }
      // -------------------------------

      tokenExists = true;
    } 
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined')
    }

    // Define o ID que será usado nos tokens (vindo do parâmetro ou do banco)
    const currentUserId = userId ?? tokenAlreadyExists?.userId;


    const expiresAt = Util.generateExpiration(process.env.ACCESS_TOKEN_EXPIRES_MINUTES) // 15 min

    const token = jwt.sign(
      { userId: currentUserId },
      process.env.JWT_SECRET,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
    );

    // Lógica para decidir se gera um NOVO Refresh Token ou mantém o atual
    let finalRefreshToken = refreshToken;
    let refreshExpiresIn = tokenAlreadyExists?.expiresIn;

    if(!tokenExists) {
      refreshExpiresIn = Util.generateExpiration(process.env.REFRESH_TOKEN_EXPIRES_DAYS); // 1 day
      finalRefreshToken = jwt.sign(
        { userId: currentUserId },
        process.env.JWT_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRES}
      );

      const dataAuth = {user: {
                                connect: {
                                  id: currentUserId
                                }
                              }, 
                        token : finalRefreshToken, 
                        expiresIn: refreshExpiresIn};
      // 2. Persistência
      await this.refreshTokenRepository.create(dataAuth);
    }

    return {
      user_id: currentUserId,
      tokens: [
        { token: token, expiresIn: expiresAt },
        { refresh_token: finalRefreshToken, expiresIn: refreshExpiresIn }
      ]
    }
  }
}