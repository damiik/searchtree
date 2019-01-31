"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var methodOverride = require("method-override");

var mongoose = require('mongoose');

var notes = require('./routes/notes');

var data = require('../data.js'); // REQUIRE BASE ON LOCAL DIRECTORY (here server.js directory)


var fetch = require('node-fetch');

var app = express();
console.log("mongodb:" + data.data.mongodb);
mongoose.connect(data.data.mongodb, function (err) {
  if (err) console.log('MongoDB connection error', err);else {
    console.log(' ');
  }
});
mongoose.set('useFindAndModify', false); // Serve the static files from the React app

app.use(express.static(path.resolve('./client/dist'))); // . IS DIRECTORY from which you RUN the node command   
//app.use(express.static(__dirname)) // server DIRECTORY
// webpack HMR with webpack-hot-middleware & expres
// using webpack-dev-server and middleware in development environment
// http://andrewhfarmer.com/webpack-hmr-tutorial/

if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');

  var webpackHotMiddleware = require('webpack-hot-middleware');

  var webpack = require('webpack');

  var config = require('../webpack.config.js'); // REQUIRE BASE ON LOCAL DIRECTORY (here server.js directory)


  var compiler = webpack(config); // run webpack

  console.log("~~~THIS IS NOT PRODUCTION MODE~~~");
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
})); // Allows you to fake req.method for browsers that can’t use the proper method. Depends on bodyParser.

app.use(methodOverride());
app.use('/notes', notes);

var getGif =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var resp, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('http://api.giphy.com/v1/gifs/random?api_key=jcuPMIV6PGmOgWkzpRkNuz5r3jZLTGfO&tag=funny&rating=pg-13');

          case 2:
            resp = _context.sent;
            _context.next = 5;
            return resp.json();

          case 5:
            json = _context.sent;
            return _context.abrupt("return", {
              img_url: json.data.image_original_url
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getGif() {
    return _ref.apply(this, arguments);
  };
}();

app.use('/gif', function (req, res) {
  getGif().then(function (gif) {
    res.send(gif); // . IS DIRECTORY from which you RUN the node command    
  });
});
app.use('/', function (req, res) {
  res.sendFile(path.resolve('./client/dist/index.html')); // . IS DIRECTORY from which you RUN the node command 
});
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
console.log('ExpressJS server is ready. >>>>');
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