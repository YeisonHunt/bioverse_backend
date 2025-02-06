import { Router } from 'express';
import { getAllUsers, getUserResponses } from '../controllers/user.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate); // Apply authentication to all user routes
router.use(isAdmin); // Apply admin check to all user routes

router.get('/', getAllUsers);
router.get('/:userId/responses', getUserResponses);

export default router;