const { Pool } = require('pg');
const redis = require('redis');

class DatabaseManager {
  constructor(config) {
    this.pgPool = new Pool({
      host: config.postgres.host,
      port: config.postgres.port,
      database: config.postgres.database,
      user: config.postgres.user,
      password: config.postgres.password,
    });

    this.redisClient = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
  }

  async query(text, params) {
    const start = Date.now();
    const client = await this.pgPool.connect();

    try {
      const result = await client.query(text, params);
      const duration = Date.now() - start;

      console.log('Executed query', { text, duration, rows: result.rowCount });
      return result;
    } finally {
      client.release();
    }
  }

  async getFromCache(key) {
    try {
      const value = await this.redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }

  async setCache(key, value, ttl = 3600) {
    try {
      await this.redisClient.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  async close() {
    await this.pgPool.end();
    await this.redisClient.quit();
  }
}

module.exports = DatabaseManager;
