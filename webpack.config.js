var path = require('path')
var webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';

var browserSyncPlugin = require('browser-sync-webpack-plugin')




module.exports = {

	//devtool: 'inline-source-map',  //????
	//context: path.join(__dirname, 'js'),
	mode:'development',

    entry: ["@babel/polyfill", './client/client.jsx'], //an entry point for the application
	output: {
		/*path: path.resolve("./dist"),*/
		// path: __dirname + '/dist',
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js', /* budle.js is created dynamically!!! */
		publicPath: '/'
	},

	devServer: {

	  contentBase:  path.resolve(__dirname, 'dist') //'./dist'
	},
	
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
                        
                      presets: ['@babel/preset-env'] //"presets": ["@babel/preset-env", "@babel/preset-react"]
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
		new webpack.HotModuleReplacementPlugin()                // Hot Module Replacement in React, webpack HMR with webpack-hot-middleware & expres
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