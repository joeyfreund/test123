// Import all three assertion functions/styles from chai
import { expect, assert, should } from 'chai'

// Import the full module
import * as Hello from '../lib/hello.js';
// Import the named exports (with or without an alias)
import { DEFAULT_NAME, one, two, MagicBox as Box } from '../lib/hello.js';


describe('Hello module', function() {

  // NOTE: Usually, you will choose one of the assertion style and stick to it.
  //       I just wanted to show that there are different styles you can use.

  it('exports PI', function () {
    expect(Hello).to.have.property('PI');
  });

  it('exports one(), which returns the value 1', function () {
    assert.equal(1, one());
  });

  it('exports one(), which returns the value 2', function () {
    expect(two()).to.equal(2);
  });

  it("exports 'default' without its local name", function(){
    expect(Hello).to.have.property('default');
    expect(Hello).to.not.have.property('sayHello');
  });

});


describe('Hello.MagicBox', function(){

  it('returns the value we passed to the constructor', function(){
    let value = 42;
    let box = new Box(value);
    expect(box.whatIsInTheBox()).to.equal(value);
  });

  it('puts 0 in the box by default', function(){
    let box = new Box();
    expect(box.whatIsInTheBox()).to.equal(0);
  });

});
