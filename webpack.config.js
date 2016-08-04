var path = require('path')
var webpack = require('webpack')
var browserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {

	devtool: 'inline-source-map',
	entry: ['./client/client.js', 'webpack-hot-middleware/client'],
	output: {
		path: path.resolve("./dist"),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {

		loaders: [

		    {test: /\.js$/,	loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'react-hmre']}}
		]
	},

	plugins: [
	
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()

		// browse to http://localhost:3000/ during development 
		// new browserSyncPlugin({

		// 	host: 'localhost',
		// 	port: 3000,
		// 	proxy: 'http://localhost:8080'
	
  //     		},

	 //      // plugin options 
	 //      {
	 //        // prevent BrowserSync from reloading the page 
	 //        // and let Webpack Dev Server take care of this 
	 //        reload: false,			
	 //      }
		// )
	]
}