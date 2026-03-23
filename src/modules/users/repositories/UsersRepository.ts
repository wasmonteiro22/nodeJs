import { prisma } from '../../../database/prisma';
import { updateUserDTO } from '../dtos/updateUserSchema';

export class UsersRepository {
  async findByEmail(email: string) {
    // Se o prisma não achar nada, ele retorna null (não lança erro aqui)
    return await prisma.user.findUnique({ where: { email } });
  }
  
  async findAll() {
    // Se o prisma não achar nada, ele retorna null (não lança erro aqui)
    return await prisma.user.findMany();
  }
  
  async create(data: any) {
    // Se o e-mail já existir, o Prisma lança o erro P2002
    // Nosso Middleware Global vai capturar isso sozinho!
    return await prisma.user.create({ data });
  }
  
  async delete(id: string) {
    return await prisma.user.delete({ where: { id } });
  }

  async update(item: updateUserDTO) {
    const { email, id, ...rest } = item; // Separa o id e email do resto dos dados
    return await prisma.user.update({ where: { email }, data: item });
  }
}