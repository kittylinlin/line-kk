const redis = require('redis');
const { promisify } = require('util');

class Redis {
  constructor(host, port, password) {
    this.client = redis.createClient({ host, port, password });
    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  async get(...args) {
    try {
      const value = await promisify(this.client.get).bind(this.client)(...args);
      return value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async set(...args) {
    try {
      await promisify(this.client.set).bind(this.client)(...args);
    } catch (error) {
      console.error(error);
    }
  }
}

const client = new Redis(
  process.env.REDIS_HOST,
  process.env.REDIS_PORT,
  process.env.REDIS_PASSWORD,
);

module.exports = { client };
