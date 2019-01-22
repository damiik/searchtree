"use strict";

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var methodOverride = require("method-override");

var mongoose = require('mongoose');

var notes = require('./routes/notes');

var data = require('../data.js');

var app = express();
console.log("mongodb:" + data.data.mongodb); //mongoose.connect('mongodb://localhost/search-tree', function(err) {

mongoose.connect(data.data.mongodb, function (err) {
  if (err) console.log('MongoDB connection error', err);else {
    console.log('MongoDB connection: success..');
  }
});
app.use(express.static(path.resolve('../client/dist'))); //app.use(express.static(path.join(__dirname, 'bower_components')));
//app.use(express.static(__dirname))
// (part 4 updates)
// webpack HMR with webpack-hot-middleware & expres
// using webpack-dev-server and middleware in development environment
// http://andrewhfarmer.com/webpack-hmr-tutorial/

if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');

  var webpackHotMiddleware = require('webpack-hot-middleware');

  var webpack = require('webpack');

  var config = require('../webpack.config.js');

  var compiler = webpack(config); // run webpack

  console.log("~~~NOT PRODUCTION MODE~~~"); // app.use(webpackDevMiddleware(compiler, {noInfo: false, publicPath: config.output.publicPath}));
  // app.use(webpackHotMiddleware(compiler));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    filename: 'bundle.js',
    stats: {
      colors: true
    },
    historyApiFallback: true
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
} else {
  console.log("~~~PRODUCTION MODE~~~ ");
} // Provides req.body and req.files with the submitted data for subsequent middle-ware to use.
// The registration form uses the object notation user[name], which translates to req.body.user.name


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); //app.use(express.static(__dirname))
// Allows you to fake req.method for browsers that can’t use the proper method. Depends on bodyParser.

app.use(methodOverride());
app.use('/notes', notes);
app.use('/', function (req, res) {
  res.sendFile(path.resolve('./client/dist/index.html'));
}); // aktualny port
//var port = 3001;

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
console.log('express server is ready>>>>');
app.listen(port, process.env.IP);
app.on('error', onError);
app.on('listening', onListening); // app.listen(port, function (error) {
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

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

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
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
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

module.exports = app;