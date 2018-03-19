require("dotenv").load();
const { Tinycare, emitCanStartTimer, emitBreakTaken } = require("../src/index");

Tinycare({
  twitter: {
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessSecret,
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret
  },
  breakTime: 10000, // 10 seconds
  onCareNotification: console.log
});

setTimeout(() => emitCanStartTimer(false), 1000);
setTimeout(() => emitBreakTaken(true), 2000);
setTimeout(() => emitCanStartTimer(true), 3000);
setTimeout(() => emitBreakTaken(true), 5000);
setTimeout(() => emitCanStartTimer(false), 7000);
setTimeout(() => emitCanStartTimer(true), 9000);
setTimeout(() => emitBreakTaken(true), 20000);
