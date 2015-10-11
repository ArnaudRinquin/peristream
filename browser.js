(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    var core = require('./core');
    var EventEmitter = require('events');

    module.exports = factory(core, EventEmitter);
  } else {
    root.peristream = factory(root.core, root.EventEmitter);
  }
}(this, function (core, EventEmitter) {

  if (!pubnub) {
    throw new Error('pubnub SDK library must be loaded before peristream');
  }

  return core(pubnub, EventEmitter, fetch, Promise);
}));
