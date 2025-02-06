import sequelize from '../db/sequelize';
import Question from './Question';
import Questionnaire from './Questionnaire';
import QuestionnaireQuestion from './QuestionnaireQuestion';
import User from './User';
import UserResponse from './UserResponse';


Questionnaire.belongsToMany(Question, {
  through: QuestionnaireQuestion,
  foreignKey: 'questionnaire_id',
  otherKey: 'question_id',
  as: 'questions' 
});

Question.belongsToMany(Questionnaire, {
  through: QuestionnaireQuestion,
  foreignKey: 'question_id',
  otherKey: 'questionnaire_id',
  as: 'questionnaires'  
});

QuestionnaireQuestion.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
});

QuestionnaireQuestion.belongsTo(Questionnaire, {
  foreignKey: 'questionnaire_id',
  as: 'questionnaire'
});

User.hasMany(UserResponse, { foreignKey: 'user_id', as: 'responses' });
UserResponse.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Questionnaire.hasMany(UserResponse, { foreignKey: 'questionnaire_id', as: 'responses' });
UserResponse.belongsTo(Questionnaire, { foreignKey: 'questionnaire_id', as: 'questionnaire' });

Question.hasMany(UserResponse, { foreignKey: 'question_id', as: 'responses' });
UserResponse.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

export {
  sequelize,
  Question,
  Questionnaire,
  QuestionnaireQuestion,
  UserResponse,
};

export default sequelize;