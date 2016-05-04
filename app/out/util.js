const isDev = require( 'electron-is-dev' );
const nsLog = require( 'nslog' );

var _log = function() {
  nsLog( arguments );
};

if ( isDev ) {
  _log = function() {
    console.log( arguments );
  };
}

exports.module = {
  log: _log
};
