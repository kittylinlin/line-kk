require('dotenv').config();
const { client } = require('./connection');

async function test() {
  const value = await client.get('key');
  console.log(value);
}

test();
