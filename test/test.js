var assert = require('chai').assert;

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
    });
  });
});

describe('hello.js module', function() {
  it('should have a sayHello function.', function () {
    var hello = require('../src/hello.js');
    assert.typeOf(hello.sayHello, 'function');
  });
});
