import { Sequelize } from 'sequelize';
import { config } from '../config/database';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;