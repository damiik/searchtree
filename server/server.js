// Zbudowane w oparciu o projekt react-doto-list-start  (https://www.youtube.com/watch?v=CAZZN1gOjoI&nohtml5=False)


//mongod --dbpath c:/mongodb/data/webdev
//cd SourceCode\Javascript\react\react-search-tree
//npm run serve


/* todo:

* lista nie przewija się na początek po wybraniu tematu (mylące)
* brakuje możliwości cofania się 
* brakuje oddzielenia pomiędzy powiązanymi tematami a ostanimi wyszukiwaniami (dwa panele - drzewo głowne oraz szukanie)
* brakuje zaznaczenia główna gałąź -> powiązane tematy (wcięcie?, lepsza wizualizacja struktury drzewa)

*/

// npm i -S body-parser method-override mongoose

// cd server & mkdir routes models & touch routes/users.js routes/notes.js models/user.js models/note.js & cd..

// db.Note.insert({name:"first", note: "Boże błogosław Saszy..:)"})

// cd server & bower i bootstrap & cd ..
// * server.js
// app.use(express.static(path.join(__dirname, 'bower_components')));
// * client/index.html
	  // <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.css">
	  // ...
	  // <script src="jquery/dist/jquery.js"></script>
	  // <script src="bootstrap/dist/js/bootstrap.js"></script>


// npm i -D browser-sync
// npm i -D browser-sync-webpack-plugin




// zainstalować bootstrap 4 wraz z obsługoą dynamicznego scss ->https://github.com/shakacode/bootstrap-loader
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// #1
// npm install bootstrap-loader

// Don't forget to install these dependencies (use --save or --saveDev option per your needs to update your package.json):

// # Bootstrap 3
// npm install bootstrap-sass

// # or Bootstrap 4
// npm install bootstrap@v4.0.0-alpha.2

// # Node SASS & other loaders needed to handle styles
// npm install css-loader node-sass resolve-url-loader sass-loader style-loader url-loader

// If you're using Bootstrap 4, you probably need:

// npm install postcss-loader

// #2
// add bootstrap-loader as an entry point in your webpack config:

// entry: [ 'bootstrap-loader', './app' ]


// #3
// jQuery

// If you want to use Bootstrap's JS scripts — you have to provide jQuery to Bootstrap JS modules using imports-loader:

// module: {
//   loaders: [
//     // Use one of these to serve jQuery for Bootstrap scripts:

//     // Bootstrap 3
//     { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },

//     // Bootstrap 4
//     { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports?jQuery=jquery' },
//   ],
// },

// Note: if you're not concerned about Windows, the lines look like this (simpler regexp pattern):

// // Boostrap 3
// { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

// // Bootstrap 4
// { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },

// #4
// Icon fonts

// Bootstrap uses icon fonts. If you want to load them, don't forget to setup url-loader or file-loader in webpack config:

// module: {
//   loaders: [
//     { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
//     { test: /\.(ttf|eot)$/, loader: 'file' },
//   ],
// },


// #5
// Example Loaders Configuration:

// module.exports = {
//   module: {
//     loaders: [
//       // **IMPORTANT** This is needed so that each bootstrap js file required by
//       // bootstrap-webpack has access to the jQuery object
//       { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

//       // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
//       // loads bootstrap's css.
//       { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
//       { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
//       { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
//       { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
//       { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
//     ]
//   }
// };


////////////////////////////////////////////// SASS //////////////////////////////////////////////////////////////
// npm install sass-resources-loader


// Provide path to the file and apply loader in webpack config:

// /* webpack.config.js */

// module: {
//   loaders: [
//     // Apply loader
//     { test: /\.scss$/, loader: 'style!css!sass!sass-resources' },
//   ],
// },

// // Provide path to the file with resources
// sassResources: './path/to/resources.scss',

// // Or array of paths
// sassResources: [ './path/to/vars.scss', './path/to/mixins.scss' ]

// Now you can use these resources without manually importing them:

// /* component.scss */

// .section {
//   @include section-mixin; // <--- `section-mixin` is defined here
// }

// import React from 'react';
// import css from './component.scss';

// // ...

// render() {
//   return (
//     <div className={css.section} />
//   );
// }


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride  = require("method-override");
var mongoose = require('mongoose');
var notes = require('./routes/notes');


// (part 4 updates)
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var app = express();


mongoose.connect('mongodb://localhost/search-tree', function(err) {

    if( err ) console.log('MongoDB connection error', err);
    else {

        console.log('MongoDB connection successful');
    }
});

// (part 4 updates)
var compiler = webpack( config );
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Provides req.body and req.files with the submitted data for subsequent middle-ware to use.
// The registration form uses the object notation user[name], which translates to req.body.user.name
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allows you to fake req.method for browsers that can’t use the proper method. Depends on bodyParser.
app.use(methodOverride());


app.use('/notes', notes);

app.use('/', function (req, res) {

    res.sendFile(path.resolve('client/index.html'));
});

// aktualny port
//var port = 3001;

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);


console.log('express server ready.');

server.listen(port, process.env.IP);
server.on('error', onError);
server.on('listening', onListening);



// app.listen(port, function (error) {

//   // if (error.syscall !== 'listen') {
//   //   throw error;
//   // }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// });



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}