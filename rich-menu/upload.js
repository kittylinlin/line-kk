const fs = require('fs');
const path = require('path');
const line = require('@line/bot-sdk');

require('dotenv').config();

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const filePath = path.join(__dirname, '/rich-menu-2.png');
client.setRichMenuImage('richmenu-8659428868df4227364ebab3b288bc4b', fs.createReadStream(filePath))
  .catch((error) => console.log(error));
