import cheerio from "cheerio";

export default class WebScraper{

  // selector - String, JQuery selector.
  // transformer - function(cheerioObj)
  constructor(selector, transformer){
    Object.assign(this, { selector, transformer });
  }

  //
  // html, String
  // callback, function(Obj)
  //
  scrape(html, callback){
    let results = [];

    // If a callback was provided, we do not return a result
    if(callback){
      results = undefined;
    } else {
      callback = (item) => { results.push(item); }
    }

    // Scrape the HTML content ...
    let $ = cheerio.load(html);
    $(this.selector).each((_, item) => { callback(this.transformer($(item))); });

    return results;
  }


}
