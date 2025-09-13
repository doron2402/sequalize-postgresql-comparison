import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'mcp-db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'pass123',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: +(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: false,
    pool: { max: 20, min: 0, idle: 10000 },
  }
);