import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';
import { QuestionnaireAttributes, QuestionnaireCreationAttributes } from '../types/models';

interface QuestionnaireInstance 
  extends Model<QuestionnaireAttributes, QuestionnaireCreationAttributes>, 
    QuestionnaireAttributes {}

const Questionnaire = sequelize.define<QuestionnaireInstance>('Questionnaire', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'questionnaires',
  timestamps: false,
});

export default Questionnaire;