import Question from './Question';
import Questionnaire from './Questionnaire';
import QuestionnaireQuestion from './QuestionnaireQuestion';

// Define associations
Questionnaire.belongsToMany(Question, {
  through: {
    model: QuestionnaireQuestion,
  },
  foreignKey: 'questionnaire_id',
  otherKey: 'question_id',
  as: 'questions'
});

Question.belongsToMany(Questionnaire, {
  through: {
    model: QuestionnaireQuestion,
  },
  foreignKey: 'question_id',
  otherKey: 'questionnaire_id',
  as: 'questionnaires'
});

Question.hasMany(QuestionnaireQuestion, {
  foreignKey: 'question_id',
  as: 'questionnaireQuestions'
});

QuestionnaireQuestion.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
});

Questionnaire.hasMany(QuestionnaireQuestion, {
  foreignKey: 'questionnaire_id',
  as: 'questionnaireQuestions'
});

QuestionnaireQuestion.belongsTo(Questionnaire, {
  foreignKey: 'questionnaire_id',
  as: 'questionnaire'
});

export { Question, Questionnaire, QuestionnaireQuestion };