import { Router } from 'express';
import { UserController } from './controllers/UserController';

const usersRoutes = Router();
const userController = new UserController();

// A rota deve chamar o método handle
usersRoutes.post('/', userController.handle);
usersRoutes.get('/:email', userController.show); 
usersRoutes.get('/', userController.getAll); 
usersRoutes.delete('/:email', userController.delete); 
usersRoutes.put('/', userController.update);
//usersRoutes.get('/:id', (req, res) => { ... }); 

export { usersRoutes };
