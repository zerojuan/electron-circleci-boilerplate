const express = require( 'express' );

const app = express();

app.get( '/', function( req, res ) {
  res.send({
    message: 'Hello World!'
  });
});

const server = app.listen( 7171, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log( 'Example app listening at http://%s:%s', host, port );
});

module.exports = server;
