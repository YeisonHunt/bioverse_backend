//@ts-nocheck
import { Request, Response } from 'express';
import { fn, literal } from 'sequelize';
import User from '../models/User';
import { Question, Questionnaire, UserResponse } from '../models';


export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Primero obtenemos todos los usuarios
    const users = await User.findAll({
      where: { role: 'user' },
      attributes: ['id', 'username'],
    });

    // Luego obtenemos el conteo de cuestionarios completados para cada usuario
    const userResponseCounts = await UserResponse.findAll({
      attributes: [
        'user_id',
        [fn('COUNT', literal('DISTINCT questionnaire_id')), 'completedCount']
      ],
      group: ['user_id']
    });

    // Mapeamos los resultados
    const usersWithCounts = users.map(user => {
      const responseCount = userResponseCounts.find(
        count => count.getDataValue('user_id') === user.id
      );
      
      return {
        id: user.id,
        username: user.username,
        completedQuestionnaires: responseCount ? 
          parseInt(responseCount.getDataValue('completedCount')) : 0
      };
    });

    res.json(usersWithCounts);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    next(error);
  }
};

export const getUserResponses = async (req: Request, res: Response) => {
  try {
    let query = {}
    if (req.params.questionnaire_id ){
      query = { questionnaire_id: req.params.questionnaire_id }
    } else if (req.params.userId) {
      query = { user_id: req.params.userId }
    } 

    const responses = await getUserResponseHelper(query)

    // Group responses by questionnaire
    const groupedResponses = responses.reduce((acc: any, response) => {
      const questionnaireId = response.questionnaire_id;
      if (!acc[questionnaireId]) {
        acc[questionnaireId] = {
          questionnaireName: response.questionnaire?.name,
          responses: []
        };
      }
      acc[questionnaireId].responses.push({
        question: response.question?.question_text,
        response: response.response
      });
      return acc;
    }, {});

    res.json(Object.values(groupedResponses));
  } catch (error) {
    console.error('Error in getUserResponses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserResponseHelper = async(query)  => {
  const responses = await UserResponse.findAll({
    where: query,
    include: [
      { model: Questionnaire, as: 'questionnaire' },
      { model: Question, as: 'question' }
    ],
    order: [['created_at', 'DESC']]
  });

  return responses;
}



// Additional types for request handling
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        username: string;
        role: string;
      };
    }
  }
}