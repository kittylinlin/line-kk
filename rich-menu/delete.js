const line = require('@line/bot-sdk');

require('dotenv').config();

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

client.deleteRichMenu('richmenu-217ec2841b62b807de02b0ac1fa0c2c3')
  .catch((error) => console.log(error));
