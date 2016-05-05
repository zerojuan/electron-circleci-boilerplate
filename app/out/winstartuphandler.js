const log = require( './util.js' ).log;
const path = require( 'path' );
const spawn = require( 'child_process' ).spawn;
const electron = require( 'electron' );
const app = electron.app;

function run( args, done ) {
  const updateExe = path.resolve(
    path.dirname( process.execPath ), '..', 'Update.exe' );
  log( 'Spawning `%s` with args `%s`', updateExe, args );
  spawn( updateExe, args, {
    detached: true
  }).on( 'close', done );
}

module.exports = {
  handleStartupEvent: function() {
    if ( process.platform !== 'win32' ) {
      return false;
    }

    const cmd = process.argv[ 1 ];
    log( 'Processing squirrel command `%s`', cmd );
    const target = path.basename( process.execPath );
    if ( cmd === '--squirrel-install' || cmd === '--squirrel-updated' ) {
      run([ '--createShortcut=' + target + '' ], app.quit );
      return true;
    } else if ( cmd === '--squirrel-uninstall' ) {
      run([ '--removeShortcut=' + target + '' ], app.quit );
      return true;
    } else if ( cmd === '--squirrel-obsolete' ) {
      app.quit();
      return true;
    } else {
      return false;
    }
  }
};
