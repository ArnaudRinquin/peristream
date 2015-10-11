var pubnub = require('pubnub');
var EventEmitter = require('events');
var fetch = require('node-fetch');
var core = require('./core');

module.exports = core(pubnub, EventEmitter, fetch, Promise);
