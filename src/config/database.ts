import dotenv from 'dotenv';
dotenv.config();

export const config = {
  database: process.env.DB_NAME || 'questionnaire_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres' as const,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
