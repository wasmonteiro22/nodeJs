import { Router } from 'express';
import { AuthController } from './controllers/AuthController';

const authRoutes = Router();
const authController = new AuthController();

// A rota deve chamar o método handle
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', authController.logout);

export { authRoutes };
