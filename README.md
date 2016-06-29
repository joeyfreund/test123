# Intro to NodeJS

Some notes and examples of basic NodeJS (and JS in general) concepts.

### Creating a project using `npm`

 * In a new directory, run `npm init` (guide you through creating `package.json`).
 * Create `src/index.js` (or whichever path appears as `main` in your `package.json`)
 * Edit `package.json`, and add the `start` script (the to `scripts` objects)
 * Run `npm start`

### Add unit tests

 * Install a test runner, `npm install mocha --save-dev`
 * Install an assertion library, `npm install --save-dev chai`
 * Add `test/test.js`
 * Now, run the tests using `node_modules/.bin/mocha`           
   _Note:_ We run `mocha` from `node_modules/.bin`, so we don't depend on Mocha being globally available.

Once we change the `test` script in `package.json`, we can `npm test`.

### Setup Travis-CI

 * Push the project into a GitHub repo
 * Enable Travis-CI on that repo (in the repo's settings)
 * Add `.travis.yml` and push to GitHub
 * Now, you can go to Travis-CI and see the build.

 We can embed the [![Build Status](https://travis-ci.org/joeyfreund/test123.svg?branch=master)](https://travis-ci.org/joeyfreund/test123) badge to indicate the status of the latest build.

### Using modules

 * Create `src/hello.js`
 * In `src/hello.js`, we populate the `module.exports` with values (usually functions).
 * In other modules (e.g. `src/index.js`) we `require(PATH_OR_NAME)`, which gives us back the `exports` object.
 * After updating the code in `index.js` to use the function from `hello.js`, you can `npm start`.
 * Also, update the tests, and `npm test`.

### It's 2016, let's use ES6

ES6 (aka ES2015) is the newest standard of JavaScript.
It's great, but there's one problem - It's fully supported everywhere (in fact, in most runtimes it's not fully supported yet).          

The solution - Transpile (i.e. translate/compile) ES6 source to ES5 (or any other JavaScript specs that are fully supported). Currently, the industry stanrad is [Babel](https://babeljs.io/).

First, setup dependencies:

 * Install dependencies `npm install --save-dev babel-core babel-cli babel-preset-es2015`
 * Configure Babel default by creating `.babelrc`

Next, we can update our `src/` and `test/` code to use ES6.      
Finally, make sure that `npm start` or `npm test` use the transpiled (**not** the original) source code:

 * Setup the `scripts` object in `package.json`.

----

### Async programming

To get a better feel for what programming in Node.js is like, we'll write a
small web scraping program in `index.js`.

OK, we wrote a quick script, but now, let's do things right ...
Let's create some unit tests and the `WebScraper` class to pass them.
