# Tinycare

A simple module that brings some care to your packages. Gets tweets from [@tinycarebot](https://twitter.com/tinycarebot) and returns them to you every `breakTime` amount. Unless you have deemed a break has been taken and then the timer resets and it will wait another `breakTime` amount until fetching a new tweet.

Based on https://github.com/notwaldorf/tiny-care-terminal :heart:

# Install

```
yarn add tinycare
```

or

```
npm i --save tinycare
```

# Usage

```javascript
const { Tinycare, emitCanStartTimer, emitBreakTaken } = require("tinycare");

// Initialize tinycare
Tinycare({
  // Twitter tokens and keys for fetching tweets from `@tinycarebot`
  // Get these from `https://apps.twitter.com/`
  twitter: {
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessSecret,
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret
  },
  // The amout of time to wait before sending some care. (ie. fetching a tweet from `@tinycarebot`)
  breakTime: 10000, // 10 seconds
  // What to do with the tweets you get back
  onCareNotification: console.log
});

// call emitCanStartTimer(boolean) to tell tinycare to start the timer, or not.
setTimeout(() => emitCanStartTimer(false), 1000);
// call emitBreakTaken(boolean) to tell tinycare a break has been taken and it can restart the timer, or not.
setTimeout(() => emitBreakTaken(true), 2000);
setTimeout(() => emitCanStartTimer(true), 3000);
setTimeout(() => emitBreakTaken(true), 5000);
setTimeout(() => emitCanStartTimer(false), 7000);
setTimeout(() => emitCanStartTimer(true), 9000);
setTimeout(() => emitBreakTaken(true), 20000);
```
