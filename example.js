var prompt = require('prompt');
var peristream = require('./index');

prompt.start();
var schema = {
  properties: {
    periscopeURL: {
      message: 'Periscope URL or ID',
      required: true
    }
  }
};
prompt.get(schema, function(err, result){
  if (err) return;

  var stream = peristream(result.periscopeURL);

  stream.connect().then(function(emitter){

    console.log('CONNECTED');

    // emitter.on(peristream.HEARTS, function(message){
    //   console.log('HEART', message);
    // });

    emitter.on(peristream.ALL, function(message){
      console.log('MESSAGE', message);
    });

    emitter.on(peristream.DISCONNECTED, function(message){
      console.log('DISCONNECTED', message);
    });
  });

});
