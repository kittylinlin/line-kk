const line = require('@line/bot-sdk');

require('dotenv').config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.Client(config);

const richmenu = {
  size: {
    width: 2500,
    height: 843,
  },
  selected: false,
  name: 'Main Function',
  chatBarText: 'Tap to Open',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 1250,
        height: 843,
      },
      action: {
        type: 'message',
        text: 'bus',
      },
    },
    {
      bounds: {
        x: 1250,
        y: 0,
        width: 1250,
        height: 840,
      },
      action: {
        type: 'message',
        text: 'weather',
      },
    },
  ],
};

client.createRichMenu(richmenu)
  .then((richMenuId) => console.log({ richMenuId }))
  .catch((error) => {
    console.log({
      statusCode: error.statusCode,
      message: error.statusMessage,
      data: JSON.stringify(error.originalError.response.data),
    });
  });
