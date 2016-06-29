import { expect } from 'chai'
import sinon from 'sinon';
import WebScraper from '../lib/web_scraper.js';


describe('WebScraper', function() {

  it('scrapes simple HTML with tag-name selector', function () {
      let scraper = new WebScraper('li', e => Number(e.text()));
      let html = '<ul><li>1</li><li>2</li><li>3</li></ul>';
      expect(scraper.scrape(html)).to.deep.equal([1,2,3]);
  });


  it('accepts a callback, and calls it on each scraped item', function () {
      let scraper = new WebScraper('li', e => Number(e.text()));
      let html = '<ul><li>1</li><li>2</li><li>3</li></ul>';

      var callback = sinon.spy();
      scraper.scrape(html, callback);

      expect(callback.callCount).to.equal(3);
      expect(callback.calledWith(null, 1)).to.be.ok;
      expect(callback.calledWith(null, 2)).to.be.ok;
      expect(callback.calledWith(null, 3)).to.be.ok;
  });


  it('should return undefined if a callback was given', function () {
      let scraper = new WebScraper('li', e => Number(e.text()));
      let html = '<ul><li>1</li><li>2</li><li>3</li></ul>';

      var callback = (err, item) => {};
      expect(scraper.scrape(html, callback)).to.be.undefined;
  });


  describe('Error handling', function(){

      // Async'
      it('should pass an error to the callback, when it occurs', function (done) {
          let scraper = new WebScraper('li', e => Number(e.text()));
          let html = null;

          scraper.scrape(html, (err, item) => {
              expect(err).to.not.be.null;
              done();
          });
      });

      // Sync'
      it('should throw errors when a callback is not provided', function () {
          let scraper = new WebScraper('li', e => Number(e.text()));
          let html = null;
          expect(() => scraper.scrape(html)).to.throw(Error);
      });

  });


});
