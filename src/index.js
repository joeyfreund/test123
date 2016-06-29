require('es6-promise').polyfill();
require('isomorphic-fetch');

import WebScraper from './web_scraper.js'


//
// Params:
//  - url, String
//  - scraper, WebScraper
//  - onData, function(arrayOfObjects)
//  - onError, function(errorObj)
//
function scrapeURL(url, scraper, onData, onError = (ex => {})){
  fetch(url).then(response => {
      if (response.status >= 400) {
  			throw new Error(`Bad response from server (status: ${response.status})`);
  		}
      return response.text(); // text() consumes a stream (i.e. can only be called once)
    })
    .then(body => scraper.scrape(body))
    .then(data => onData(data))
    .catch(ex => onError(ex));
}


// Create a scraper that extracts data from catalog pages on www.ssense.com
let scraper = new WebScraper('div.browsing-product-item', e => {
      let result = {};
      ['sku', 'brand', 'name', 'image'].forEach(key => {
        result[key] = e.find(`meta[itemprop=${key}]`)[0].attribs.content;
      });
      return result;
});


// Take a URL as a command-line argument
if(process.argv.length != 3){
  console.error(`Usage: node ${process.argv[1]} URL`);
  process.exit(1);
}
let url = process.argv[2];

// Scrape the URL and print JSON data to the console
scrapeURL(url, scraper,
  data => {
    console.log(JSON.stringify(data));
  },
  error => {
    console.log('ERROR: ', error);
  }
);
