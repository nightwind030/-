const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const { stop } = require('giveaway.js')
await stop()