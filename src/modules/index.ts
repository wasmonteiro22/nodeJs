import { Router } from 'express';
import { usersRoutes } from './users/users.routes';
import { authRoutes } from './auth/auth.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

export { router };

