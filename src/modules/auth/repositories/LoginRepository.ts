import { prisma } from '../../../database/prisma';

export class LoginRepository {
  
  async findByUserId(userId: string) {
    return await prisma.login.findFirst({ where: { user_id: userId , orderBy: { createdAt: 'desc' } }});
  }
  
  async create(data: any) {
    return await prisma.login.create({ data });
  }
}