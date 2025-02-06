import { Request, Response, NextFunction } from 'express';
import { FindOptions, Model } from 'sequelize';
import sequelize, { Question, Questionnaire, QuestionnaireQuestion } from '../models';
import { QuestionAttributes, QuestionnaireAttributes } from '../types/models';
import UserResponse from '../models/UserResponse';

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const questionnaireId = parseInt(req.params.id);

    const findOptions: FindOptions = {
      where: { id: questionnaireId },
      include: [{
        model: Question,
        as: 'questions',
        through: {
          //@ts-ignore
          model: QuestionnaireQuestion,
          attributes: ['priority']
        },
        attributes: ['id', 'question_text', 'question_type', 'options']
      }],
      order: [[{ model: Question, as: 'questions' }, QuestionnaireQuestion, 'priority', 'ASC']]
    };

    const questionnaire = await Questionnaire.findByPk(questionnaireId, findOptions);

    if (!questionnaire) {
      res.status(404).json({ message: 'Questionnaire not found' });
      return;
    }

    const questions = (questionnaire.get('questions') as unknown as (QuestionAttributes & { QuestionnaireQuestion: { priority: number } })[])
      .map(question => ({
        id: question.id,
        question_text: question.question_text,
        question_type: question.question_type,
        options: question.options,
        priority: question.QuestionnaireQuestion.priority
      }));

    res.json(questions);
  } catch (error) {
    console.error('Error in getQuestions:', error);
    next(error);
  }
};

export const getAllQuestionnaires = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const findOptions: FindOptions = {
      include: [{
        model: Question,
        as: 'questions',
        through: {
          attributes: ['priority']
        }
      }]
    };

    const questionnaires = await Questionnaire.findAll(findOptions);
    res.json(questionnaires);
  } catch (error) {
    next(error);
  }
};

export const getQuestionnaireById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const questionnaireId = parseInt(req.params.id);

    const findOptions: FindOptions = {
      include: [{
        model: Question,
        as: 'questions',
        through: {
          attributes: ['priority']
        }
      }]
    };

    const questionnaire = await Questionnaire.findByPk(questionnaireId, findOptions);

    if (!questionnaire) {
      res.status(404).json({ message: 'Questionnaire not found' });
      return;
    }

    res.json(questionnaire);
  } catch (error) {
    next(error);
  }
};

export const submitResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { responses } = req.body;
    const questionnaireId = parseInt(req.params.id);

    // Validate that the questionnaire exists
    const questionnaire = await Questionnaire.findByPk(questionnaireId);
    if (!questionnaire) {
      res.status(404).json({ message: 'Questionnaire not found' });
      return;
    }

    // Start a transaction
    const t = await sequelize.transaction();

    try {
      // Delete existing responses for this questionnaire
      await UserResponse.destroy({
        where: {
          user_id: req.user.id,
          questionnaire_id: questionnaireId
        },
        transaction: t
      });

      // Create new responses
      const responsesToCreate = Object.entries(responses).map(([questionId, response]) => ({
        user_id: req.user.id,
        questionnaire_id: questionnaireId,
        question_id: parseInt(questionId),
        //@ts-ignore
        response: Array.isArray(response) ? JSON.stringify(response) : response.toString()
      }));

      await UserResponse.bulkCreate(responsesToCreate, { transaction: t });

      // Commit transaction
      await t.commit();

      res.json({ message: 'Responses submitted successfully' });
    } catch (error) {
      // Rollback transaction on error
      await t.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

