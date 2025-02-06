import { Router } from 'express';
import { getAllUsers, getUserResponses } from '../controllers/user.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate); 
router.use(isAdmin); 

router.get('/', getAllUsers);
router.get('/:userId/responses', getUserResponses);

export default router;