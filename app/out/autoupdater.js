const electron = require( 'electron' );
const os = require( 'os' );
const autoupdater = electron.autoUpdater;
const app = electron.app;

const UPDATE_SERVER_HOST = 'sample-electron.juliuscebreros.com';

module.exports = {
  listenToUpdates: function( window ) {
    const version = app.getVersion();

    if ( os.platform() !== 'darwin' ) {
      return;
    }


    autoupdater.addListener( 'checking-for-update', function() {
      console.log( 'Checking for update' );
    });

    autoupdater.addListener( 'update-not-available', function() {
      console.log( 'Update not available' );
    });

    autoupdater.addListener( 'update-available', function() {
      console.log( 'Update available' );
    });

    var url = 'http://' + UPDATE_SERVER_HOST +
      '/update/' + os.platform() + '_' + os.arch() + '/' + version;
    console.log( url );
    autoupdater.setFeedURL( url );

    window.webContents.once( 'did-finish-load', function( event ) {
      console.log( 'I am checking for updates' );
      autoupdater.checkForUpdates();
    });

  }
};
