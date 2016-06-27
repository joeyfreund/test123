# Intro to NodeJS

Some notes and examples of basic NodeJS (and JS in general) concepts.

### Creating a project using `npm`

 * In a new directory, run `npm init` (guide you through creating `package.json`).
 * Create `src/index.js` (or whichever path appears as `main` in your `package.json`)
 * Edit `package.json`, and add the `start` script (the to `scripts` objects)
 * Run `npm run start`

### Add unit tests

 * Install a test runner, `npm install mocha --save-dev`
 * Install an assertion library, `npm install --save-dev chai`
 * Add `test/test.js`
 * Now, run the tests using `node_modules/.bin/mocha`           
   _Note:_ We run `mocha` from `node_modules/.bin`, so we don't depend on Mocha being globally available.

Once we change the `test` script in `package.json`, we can `npm run test`.
