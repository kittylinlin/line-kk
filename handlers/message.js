const querystring = require('querystring');
const { client } = require('../redis/connection');
const { eBus } = require('../functions/eBus');

async function messageHandler(event) {
  const { userId } = event.source;
  const { text } = event.message;

  const feature = await client.get(userId);
  if (feature == 'bus') {
    const routeNumber = text;
    const result = await eBus(routeNumber);
    return {
      type: 'text',
      text: result,
    };
  }

  return {
    type: 'text',
    text: text,
  };
}

module.exports = { messageHandler };
