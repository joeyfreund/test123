import cheerio from "cheerio";

export default class WebScraper{

  // selector - String, JQuery selector.
  // transformer - function(cheerioObj)
  constructor(selector, transformer){
    Object.assign(this, { selector, transformer });
  }

  //
  // html, String
  // callback, (Optional) function(error, item)
  //
  scrape(html, callback){
    let results = callback ? undefined : [];
    callback = callback || ((err, item) => {
        if(err) throw err;  else results.push(item);
    });

    try {
      let $ = cheerio.load(html);
      $(this.selector).each((_, item) => {
          callback(null, this.transformer($(item)));
      });
    } catch (err) {
      callback(err, null);
    }

    return results;
  }

}
