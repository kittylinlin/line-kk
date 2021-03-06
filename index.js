require('dotenv').config();

const express = require('express');
const line = require('@line/bot-sdk');
const { postbackHandler } = require('./handlers/postback');
const { messageHandler } = require('./handlers/message');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// event handler
async function handleEvent(event) {
  switch (event.type) {
    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Welcome!',
      });
    case 'postback':
      return client.replyMessage(event.replyToken, postbackHandler(event));
    case 'message':
      return client.replyMessage(event.replyToken, await messageHandler(event));
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Coming Soon ...',
      });
  }
}

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
