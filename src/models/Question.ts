import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';
import { QuestionAttributes, QuestionCreationAttributes } from '../types/models';

interface QuestionInstance 
  extends Model<QuestionAttributes, QuestionCreationAttributes>, 
    QuestionAttributes {}

const Question = sequelize.define<QuestionInstance>('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  question_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'questions',
  timestamps: false,
});

export default Question;