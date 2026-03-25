import request from 'supertest';
import { app } from '../app'; // ou '../app' se separar
import { prisma } from '../database/prisma';

describe('Users', () => {

  let token: string;

  // roda antes de todos os testes
  beforeAll(async () => {
    // limpa banco
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();

    // cria usuário
    await request(app)
      .post('/users')
      .send({
        name: 'Washington',
        email: 'washington@test.com',
        password: '123456',
      });

    // faz login
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'washington@test.com',
        password: '123456',
      });

    token = response.body.tokens.accessToken;
  });

  // limpa depois
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // ------------------------------------

  it('should list users with valid token', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // ------------------------------------

  it('should NOT list users without token', async () => {
    const response = await request(app)
      .get('/users');

    expect(response.status).toBe(401);
  });

  // ------------------------------------

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Novo User',
        email: 'novo@test.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // ------------------------------------

  it('should NOT create user with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'User',
        email: 'duplicado@test.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'User',
        email: 'duplicado@test.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

});