import { prisma } from '../../../database/prisma';

export class RefreshTokenRepository {
  
  async getRefreshToken(token: string) {
    return await prisma.RefreshToken.findFirst({ where: { token: token }, orderBy: { createdAt: 'desc' }});
  }
  
  async create(data: any) {
    return await prisma.RefreshToken.create({ data });
  }

  async delete(token: String) {
    return await prisma.RefreshToken.delete({
          where: { token: token }
        })
  }
}