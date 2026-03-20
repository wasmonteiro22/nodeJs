import { prisma } from '../../../database/prisma';

export class UsersRepository {
  async findByEmail(email: string) {
    // Se o prisma não achar nada, ele retorna null (não lança erro aqui)
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(data: any) {
    // Se o e-mail já existir, o Prisma lança o erro P2002
    // Nosso Middleware Global vai capturar isso sozinho!
    return await prisma.user.create({ data });
  }
}