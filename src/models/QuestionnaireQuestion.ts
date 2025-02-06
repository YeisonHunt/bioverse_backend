import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../db/sequelize';

interface QuestionnaireQuestionModel extends Model<InferAttributes<QuestionnaireQuestionModel>, InferCreationAttributes<QuestionnaireQuestionModel>> {
  id: CreationOptional<number>;
  questionnaire_id: number;
  question_id: number;
  priority: number;
  created_at: CreationOptional<Date>;
}

const QuestionnaireQuestion = sequelize.define<QuestionnaireQuestionModel>('QuestionnaireQuestion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  questionnaire_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'questionnaire_questions',
  timestamps: false,
});

export default QuestionnaireQuestion;