const line = require('@line/bot-sdk');

require('dotenv').config();

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

client.deleteRichMenu('richmenu-3bf967674afd1c6d367416203b82491e')
  .catch((error) => console.log(error));
