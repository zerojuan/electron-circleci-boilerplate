const electron = require( 'electron' );
const os = require( 'os' );
const autoupdater = electron.autoUpdater;
const app = electron.app;

const UPDATE_SERVER_HOST = 'sample-electron.juliuscebreros.com';

module.exports = {
  listenToUpdates: function( window ) {
    const version = app.getVersion();

    autoupdater.addListener( 'checking-for-update', function() {
      console.log( 'Checking for update' );
    });

    autoupdater.addListener( 'update-not-available', function() {
      console.log( 'Update not available' );
    });

    autoupdater.addListener( 'update-available', function() {
      console.log( 'Update available' );
    });

    autoupdater.setFeedURL( 'https://' + UPDATE_SERVER_HOST +
      '/update/' + os.platform() + '_' + os.arch() + '/' + version );

    window.webContents.once( 'did-frame-finish-load', function( event ) {
      autoupdater.checkForUpdates();
    });
  }
};
