import { prisma } from '../../../database/prisma';

export class RefreshTokenRepository {
  
  async getRefreshToken(token: string) {
    return await prisma.refreshToken.findFirst({ where: { token: token }, orderBy: { createdAt: 'desc' }});
  }
  
  async create(data: any) {
    return await prisma.refreshToken.create({ data });
  }

  async delete(token: string) {
    return await prisma.refreshToken.deleteMany({
          where: { token: token }
        })
  }
}