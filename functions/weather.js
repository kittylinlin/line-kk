const fs = require('fs');
const find = require('lodash/find');

function weather(country, town) {
  let countries;
  let towns;

  if (!country) {
    return 'Please enter at least a country.';
  }

  try {
    const countryFile = fs.readFileSync('./data/country.json');
    countries = JSON.parse(countryFile);
  } catch (err) {
    console.log(err);
    return 'Sorry, something went wrong.';
  }

  const countryInfo = find(countries, (data) => (data.Name.C === country || data.Name.E === country));
  if (!countryInfo) {
    return `Cannot find ${country}`;
  }

  if (!town) {
    return `https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=${countryInfo.ID}`;
  }

  try {
    const townFile = fs.readFileSync('./data/town.json');
    towns = JSON.parse(townFile);
  } catch (err) {
    console.log(err);
    return 'Sorry, something went wrong.';
  }

  const townInfo = find(towns[countryInfo.ID], (data) => (data.Name.C === town || data.Name.E === town));
  if (!townInfo) {
    return `Cannot find ${town}`;
  }

  return `https://www.cwb.gov.tw/V8/C/W/Town/Town.html?TID=${townInfo.ID}`;
}

module.exports = { weather };
