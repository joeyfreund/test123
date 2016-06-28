import request from "request";
import cheerio from "cheerio";

function scrapeCatalogPage(url, onError, onData){

  let itemToDataObject = (item) => {
    let result = {};
    ['sku', 'brand', 'name', 'image'].forEach(key => {
      result[key] = cheerio(`meta[itemprop=${key}]`, item)[0].attribs.content;
    });
    return result;
  }


  request(url, function (error, response, body) {
    if(error){
      onError(error);
    } else {
      let itemId2data = {};

      cheerio('div.browsing-product-item', body).each((_, item) => {
        var itemData = itemToDataObject(item);
        itemId2data[itemData['sku']] = itemData;
      });

      onData(itemId2data);

    }

  });

}


scrapeCatalogPage('https://www.ssense.com/en-ca/women/sale',
  err  => console.log('ERROR!', err),
  data => console.log('Got ' + Object.keys(data).length + ' of data items.', data)
);
