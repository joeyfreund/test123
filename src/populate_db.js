require('es6-promise').polyfill();
require('isomorphic-fetch');
var mysql = require('mysql');

import WebScraper from './web_scraper.js'


//
// Params:
//  - url, String
//  - scraper, WebScraper
//  - callback, function(err, data), where data is an array of objects.
//
function scrapeURL(url, scraper, callback){
  fetch(url).then(response => {
      if (response.status >= 400) {
  			throw new Error(`Bad response from server (status: ${response.status})`);
  		}
      return response.text(); // text() consumes a stream (i.e. can only be called once)
    })
    .then(body => scraper.scrape(body))
    .then(data => callback(null, data))
    .catch(ex => callback(ex, null));
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

// FIXME: In a real application, you should not hard-code connection arguments
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test_db'
});

function main(){
  // Scrape the URL and print JSON data to the console
  scrapeURL(url, scraper, (error, data) => {
      if(error){
          console.log('ERROR: ', error);
      } else {
          data.forEach(row => {
            db.query(
              "INSERT INTO products (sku, brand, name, image) VALUES (?,?,?,?) " +
              "ON DUPLICATE KEY UPDATE brand=?, name=?, image=?",
              [row.sku, row.brand, row.name, row.image, row.brand, row.name, row.image],
              function(err, result){
                if (err){
                  console.log('ERROR:', err);
                }
              }
            );
          });
      }
  });
}



db.connect(function(err, data){
  if(err){
    console.log('ERROR', err);
    process.exit(1);
  }
  main();
});




// Close the connection after 3 seconds
// This is a hack. In a real application, this part of the code would use the
// DB connection, but won't be in charge of establishing/closing the connection.
setTimeout(() => { db.end()}, 3 * 1000);
