const github = require( 'octonode' );
const fs = require( 'fs' );
const path = require( 'path' );

var client = github.client( process.env.GITHUB_AUTH );
var ghrepo = client.repo( 'zerojuan/electron-circleci-boilerplate' );

var version = process.env.CIRCLE_TAG;
ghrepo.release({
  tag_name: 'v' + version,
  draft: true,
  name: 'v' + version
}, function( err, data ) {
  if ( err ) {
    throw new Error( err );
  }
  var id = data.id;

  var p = path.join( __dirname,
      '../dist/CoolElectronApp-' + version + '.deb' );
  var archive = fs.readFileSync( p );

  var options = {
    name: 'CoolElectronApp.deb'
  };

  var ghRelease = client.release( 'zerojuan/electron-circleci-boilerplate', id );
  ghRelease.uploadAssets( archive, options, function( err, data ) {
    if ( err ) {
      throw new Error( err );
    }

    console.log( data );
    return;
  });
});
