const electron = require( 'electron' );
const os = require( 'os' );
const log = require( 'nslog' );
const autoupdater = electron.autoUpdater;
const app = electron.app;

const UPDATE_SERVER_HOST = 'sample-electron.juliuscebreros.com';

module.exports = {
  listenToUpdates: function( window ) {
    const version = app.getVersion();

    if ( os.platform() !== 'darwin' ) {
      return;
    }

    log( 'I am loaded what is up' );

    autoupdater.addListener( 'checking-for-update', function() {
      log( 'Checking for update' );
    });

    autoupdater.addListener( 'update-not-available', function() {
      log( 'Update not available' );
    });

    autoupdater.addListener( 'update-available', function() {
      log( 'Update available' );
    });

    var url = 'http://' + UPDATE_SERVER_HOST +
      '/update/' + os.platform() + '_' + os.arch() + '/v' + version;
    log( url );
    autoupdater.setFeedURL( url );

    window.webContents.once( 'did-finish-load', function( event ) {
      log( 'I am checking for updates' );
      autoupdater.checkForUpdates();
    });

  }
};
