const axios = require('axios');
const cheerio = require('cheerio');

async function eBus(routeNumber) {
  let response;
  try {
    response = await axios.get('https://ebus.gov.taipei/EBus/RouteList?ct=all');
  } catch (error) {
    console.error(error);
    return 'Sorry, something went wrong.';
  }

  let $ = cheerio.load(response.data);
  const result = $('.busline ul li').filter((index, element) => $(element).text() === routeNumber).html();

  if (!result) {
    return `Cannot find ${routeNumber}.`;
  }

  $ = cheerio.load(result);
  const hrefValue = $('a').attr('href');

  const regex = /(javascript:go\(')([0-9]+)('\))/;
  const routeId = regex.exec(hrefValue)[2];
  return `https://ebus.gov.taipei/EBus/VsSimpleMap?routeid=${routeId}&amp;gb=0`;
}

module.exports = { eBus };
