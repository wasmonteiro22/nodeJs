import { prisma } from '../../../database/prisma';

export class LoginRepository {
  
  async getToken(token: string) {
    return await prisma.TokenBlacklist.findFirst({ where: { token: token }, orderBy: { createdAt: 'desc' }});
  }
  
  async create(data: any) {
    return await prisma.TokenBlacklist.create({ data });
  }
}