// redisClient.js
const { createClient } = require('redis');

const redisClient = createClient({ url: 'redis://localhost:6379' });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect right away
redisClient
  .connect()
  .then(() => console.log('🎯 Connected to Redis successfully!'))
  .catch((err) => console.error('Redis connection failed:', err));

module.exports = redisClient;
