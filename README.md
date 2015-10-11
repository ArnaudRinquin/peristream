# Peristream

A wrapper around [periscope.tv](https://www.periscope.tv/) event streams, allowing you to easilly access them

## Usage

```shell
npm i -S peristream
```

```js

var peristream = require('peristream');

var stream = peristream(urlOrId);

stream.connect().then(function(emitter){
  emitter.on(peristream.ALL, function(message){
    // ...
  });

  emitter.on(peristream.HEARTS, function(message){
    // ...
  });

  emitter.on(peristream.COMMENTS, function(message){
    // ...
  });

  emitter.on(peristream.DISCONNECT, function(message){
    // ...
  });

});

// eventually...
stream.disconnect();
```

## Example

Example browser usage at [`periscope-examples`](https://github.com/ArnaudRinquin/peristream-examples).

For a node exammple, simply:

```shell
npm start
```
