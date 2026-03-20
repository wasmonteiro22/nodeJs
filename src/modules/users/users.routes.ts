import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';

const usersRoutes = Router();
const createUserController = new CreateUserController();

// A rota deve chamar o método handle
usersRoutes.post('/', createUserController.handle);
//usersRoutes.get('/:id', (req, res) => { ... }); 

export { usersRoutes };
