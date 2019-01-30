var path = require('path')
var webpack = require('webpack');

var browserSyncPlugin = require('browser-sync-webpack-plugin')




module.exports = {

	//devtool: 'inline-source-map',  //????
	//context: path.join(__dirname, 'js'),
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    entry: ["@babel/polyfill", './client/client.jsx'], //an entry point for the application
	output: {
		/*path: path.resolve("./dist"),*/
		// path: __dirname + '/dist',
		path: path.resolve("./client/dist"),
		filename: 'bundle.js', /* budle.js is created dynamically!!! */
		publicPath: '/'
	},

	// devServer: {   // webpack is running from node.js, devServer options ignored!!

	//   contentBase: path.resolve("./client/dist"), //'./dist'
	//   proxy: [{
	// 	context: ['/notes', '/api'],
	// 	target: 'http://localhost:3001',
	//   }]
	// },
	
	resolve: {

		extensions: ['*', '.js', '.jsx']
	},

    module: {

        rules: [

            {
                // Look for JavaScript files and apply the babel-loader
                // excluding the './node_modules' directory. It uses the
                // configuration in `.babelrc`
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {

                    loader: 'babel-loader',  // opiton for  --module-bind js=babel-loader in package.json
                    options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							
							['@babel/plugin-proposal-decorators', { "legacy": true }],
							'@babel/plugin-proposal-class-properties'
						]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader'
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
			}
        ]
    },

	plugins: [

		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),                // Hot Module Replacement in React, webpack HMR with webpack-hot-middleware & expres
		new browserSyncPlugin({                                  // Webpack Dev Server 
			host: 'localhost',
			port: 3002,
			browsers: [],
			proxy: 'http://localhost:3001/'                     // Webpack Dev Server proxy server localhost:3001
		  },
		  // plugin options
		  {
			// prevent BrowserSync from reloading the page
			// and let Webpack Dev Server take care of this
			reload: false
		  })

	]
}



	// module: {

	// 	loaders: [

	// 	    {
	// 			test: /\.js?$/, 
	// 			loader: 'babel-loader', 
	// 			exclude: /node_modules/, 
	// 			query: { presets: ['react', 'es2015', 'react-hmre']}
	// 		}

	// 	]
	// },

			/*new webpack.NoErrorsPlugin()*/

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
		// )