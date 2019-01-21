var config = require('./webpack.config.js');
var webpack = require('webpack');

config.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")  // don't start webpack from server.js when NODE_ENV = production
    }
  })
);


module.exports = config;