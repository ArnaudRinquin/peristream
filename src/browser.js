if (!pubnub) {
  throw new Error('pubnub SDK library must be loaded before peristream');
}

var core = require('./core');
var EventEmitter = require('events');

module.exports = core(pubnub, EventEmitter, fetch, Promise);
