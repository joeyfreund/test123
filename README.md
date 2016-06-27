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
