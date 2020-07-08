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
      text: 'Please select a bus route.',
    };
  }
  return {
    type: 'text',
    text: feature,
  };
}

module.exports = { postbackHandler };
