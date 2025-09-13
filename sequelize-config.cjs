module.exports = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'pass123',
  database: process.env.DB_NAME || 'mcp-db',
  host: process.env.DB_HOST || '127.0.0.1',
  port: +(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  logging: false
};