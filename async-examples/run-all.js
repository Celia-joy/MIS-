/**
 * Run all examples sequentially to compare them side by side
 */

const callbacks = require('./1-callbacks');
const promises = require('./2-promises');
const asyncAwait = require('./3-async-await');

const username = process.argv[2] || 'octocat';

console.log('='.repeat(60));
console.log('COMPARING CALLBACKS, PROMISES, AND ASYNC/AWAIT');
console.log('='.repeat(60));

// Run callbacks example
callbacks.demonstrateCallbackHell(username);

// Wait a bit, then run promises
setTimeout(() => {
  promises.demonstratePromises(username);
}, 3000);

// Wait a bit more, then run async/await
setTimeout(() => {
  asyncAwait.demonstrateAsyncAwait(username);
}, 6000);
