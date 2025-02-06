export default {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: '24h',
    saltRounds: 10
  };
  