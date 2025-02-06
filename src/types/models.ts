import { Optional } from 'sequelize';

export interface QuestionAttributes {
  id: number;
  question_text: string;
  question_type: string;
  options: string[] | null;
  created_at: Date;
  QuestionnaireQuestion?: QuestionnaireQuestionAttributes;
}

export interface QuestionnaireAttributes {
  id: number;
  name: string;
  created_at: Date;
  questions?: QuestionAttributes[];
}

export interface QuestionnaireQuestionAttributes {
  id: number;
  questionnaire_id: number;
  question_id: number;
  priority: number;
  created_at: Date;
}

export interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id' | 'created_at'> {}
export interface QuestionnaireCreationAttributes extends Optional<QuestionnaireAttributes, 'id' | 'created_at'> {}
export interface QuestionnaireQuestionCreationAttributes extends Optional<QuestionnaireQuestionAttributes, 'id' | 'created_at'> {}
