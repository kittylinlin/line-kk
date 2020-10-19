const querystring = require('querystring');
const { client } = require('../redis/connection');

function postbackHandler(event) {
  const { userId } = event.source;
  const { data } = event.postback;
  const { feature } = querystring.parse(data);

  if (feature === 'bus') {
    client.set(userId, feature, 'EX', 10);
    return {
      type: 'text',
      text: 'Please enter a bus route.',
    };
  }

  if (feature === 'weather') {
    client.set(userId, feature, 'EX', 10);
    return {
      type: 'text',
      text: 'Please enter a country and town.',
    };
  }
  return {
    type: 'text',
    text: feature,
  };
}

module.exports = { postbackHandler };
