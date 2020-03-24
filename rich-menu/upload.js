const fs = require('fs');
const path = require('path');
const line = require('@line/bot-sdk');

require('dotenv').config();

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const filePath = path.join(__dirname, '/rich-menu-2.png');
client.setRichMenuImage('richmenu-217ec2841b62b807de02b0ac1fa0c2c3', fs.createReadStream(filePath))
  .catch((error) => console.log(error));
