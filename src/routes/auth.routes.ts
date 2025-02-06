import { Router } from 'express';
import { login, getCurrentUser } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { loginValidation, validate } from '../middleware/validate.middleware';

const router = Router();

router.post('/login', validate(loginValidation), login);
router.get('/me', authenticate, getCurrentUser);

export default router;
