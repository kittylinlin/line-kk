const line = require('@line/bot-sdk');

require('dotenv').config();

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

client.setDefaultRichMenu('richmenu-8659428868df4227364ebab3b288bc4b')
  .catch((error) => console.log(error));
