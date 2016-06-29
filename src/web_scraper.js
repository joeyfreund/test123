import cheerio from "cheerio";

export default class WebScraper{

  // selector - String, JQuery selector.
  // transformer - function(cheerioObj)
  constructor(selector, transformer){
    Object.assign(this, { selector, transformer });
  }

  scrape(html){
    let results = [];

    let $ = cheerio.load(html);
    $(this.selector).each((_, item) => {
      results.push(this.transformer($(item)));
    });

    return results;
  }


}
