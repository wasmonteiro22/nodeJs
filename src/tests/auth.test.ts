import request from 'supertest';
import { app } from '../app';
import { prisma } from '../database/prisma'; // ajuste o caminho

describe('Auth', () => {
  it('should login user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'washington@test.com',
        password: '456123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tokens');
  });

  
  afterAll(async () => {
    // 1. Fecha a conexão com o banco
    await prisma.$disconnect();
    
    // 2. Uso de Redis/BullMQ, fechar também:
    // await redis.quit();
  });
});
