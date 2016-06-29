import { expect } from 'chai'
import WebScraper from '../lib/web_scraper.js';


describe('WebScraper', function() {

  it('can scrape simple HTML with tag-name selector', function () {
      let scraper = new WebScraper('li', e => Number(e.text()));
      let html = '<ul><li>1</li><li>2</li><li>3</li></ul>';
      expect(scraper.scrape(html)).to.deep.equal([1,2,3]);
  });

});
