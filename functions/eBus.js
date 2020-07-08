const axios = require("axios")
const cheerio = require("cheerio")

async function eBus(routeNumber) {
    try {
        const response = await axios.get("https://ebus.gov.taipei/EBus/RouteList?ct=all");
        let $ = cheerio.load(response.data);
        const result = $('.busline ul li').filter(function(index, element) {
            return $(element).text() === routeNumber;
        }).html();

        $ = cheerio.load(result);
        const hrefValue = $('a').attr('href');
    
        const regex = /(javascript:go\(')([0-9]+)('\))/;
        const routeId = regex.exec(hrefValue)[2];
        return `https://ebus.gov.taipei/EBus/VsSimpleMap?routeid=${routeId}&amp;gb=0`;
    } catch (error) {
        console.error(error);
        return 'Sorry, something went wrong.';
    }
}

module.exports = { eBus };
