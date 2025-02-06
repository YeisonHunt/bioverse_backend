import { Router } from 'express';
import {
  getAllQuestionnaires,
  getQuestionnaireById,
  getQuestions,
  submitResponses
} from '../controllers/questionnaire.controller';
import { authenticate } from '../middleware/auth.middleware';
import { responseValidation, validate } from '../middleware/validate.middleware';
import { getUserResponses } from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.get('/', getAllQuestionnaires);
router.get('/:id', getQuestionnaireById);
router.get('/:id/questions', getQuestions);
router.get('/:questionnaire_id/user-responses', getUserResponses);
router.post('/:id/responses', validate(responseValidation), submitResponses);

export default router;