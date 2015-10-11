'use strict';

var API_URL_ROOT = 'https://api.periscope.tv/api/v2/getAccessPublic?broadcast_id=';

module.exports = function (pubnub, EventEmitter, fetch, Promise) {
  function extractTokenFromUrl(urlOrId) {
    var bits = urlOrId.split('https://www.periscope.tv/w/');
    return bits[1] || bits[0];
  }

  function fetchPeriscopeDetails(periscopeId) {
    return fetch(API_URL_ROOT + periscopeId).then(function (response) {
      return response.json();
    });
  }

  function extractKeysFromDetails(details) {
    return {
      auth_key: details.auth_token,
      subscribe_key: details.subscriber,
      publish_key: details.publisher,
      channel: details.channel
    };
  }

  function generateStream(settings) {

    var pub = pubnub({
      ssl: true,
      publish_key: settings.publish_key,
      subscribe_key: settings.subscribe_key
    });

    return {
      disconnect: function disconnect() {
        pub.unsubscribe();
      },
      connect: function connect() {
        var bus = new EventEmitter();

        return new Promise(function (resolve, reject) {
          pub.subscribe({
            channel: settings.channel,
            auth_key: settings.auth_key,
            callback: function callback(payload) {
              bus.emit(peristream.ALL, payload);
              bus.emit(payload.type, payload);
            },
            connect: function connect() {
              resolve(bus);
            },
            disconnect: function disconnect() {
              bus.emit(peristream.DISCONNECTED);
            },
            error: reject
          });
        });
      }
    };
  }

  function peristream(urlOrId) {

    var id = extractTokenFromUrl(urlOrId);
    var stream = undefined;

    return {
      connect: function connect() {
        return fetchPeriscopeDetails(id).then(extractKeysFromDetails).then(generateStream).then(function (_stream) {
          stream = _stream;
          return stream.connect();
        });
      },
      disconnect: function disconnect() {
        if (!stream) throw new Error('Stream is not connected yet');
        stream.disconnect();
      }
    };
  };

  peristream.DISCONNECTED = 'DISCONNECTED';
  peristream.ALL = 'ALL';
  peristream.COMMENTS = 1;
  peristream.HEARTS = 2;
  peristream.JOINED = 3;

  return peristream;
};
