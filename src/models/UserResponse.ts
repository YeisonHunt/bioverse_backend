import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../db/sequelize';

interface UserResponseModel extends Model<InferAttributes<UserResponseModel>, InferCreationAttributes<UserResponseModel>> {
  id: CreationOptional<number>;
  user_id: number;
  questionnaire_id: number;
  question_id: number;
  response: string;
  created_at: CreationOptional<Date>;
}

const UserResponse = sequelize.define<UserResponseModel>('UserResponse', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questionnaire_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'user_responses',
  timestamps: false,
});

// Define associations


export default UserResponse;