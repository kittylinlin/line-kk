const { client } = require('../redis/connection');
const { eBus } = require('../functions/eBus');
const { weather } = require('../functions/weather');

async function messageHandler(event) {
  const { userId } = event.source;
  const { text } = event.message;

  const feature = await client.get(userId);
  if (feature === 'bus') {
    const routeNumber = text;
    const result = await eBus(routeNumber);
    return {
      type: 'text',
      text: result,
    };
  }

  if (feature === 'weather') {
    const [country, town] = text.split(' ');
    const result = weather(country, town);
    return {
      type: 'text',
      text: result,
    };
  }

  if (text.toLowerCase().includes('bus') || text.toLowerCase().includes('公車')) {
    client.set(userId, 'bus', 'EX', 10);
    return {
      type: 'text',
      text: 'Please enter a bus route.',
    };
  }

  if (text.toLowerCase().includes('weather') || text.toLowerCase().includes('天氣')) {
    client.set(userId, 'weather', 'EX', 10);
    return {
      type: 'text',
      text: 'Please enter a country and town.',
    };
  }

  return {
    type: 'text',
    text,
  };
}

module.exports = { messageHandler };
