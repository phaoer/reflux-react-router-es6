const webpack = require('webpack');

module.exports = {
  	entry: {
  		main:__dirname + "/app/main.js",
  		vendor: ['react','react-dom','react-router','reflux']
  	},
  	output: {
	    path: __dirname + "/build",
	    filename: "[name].bundle.js"
	  },
	module: {
	        rules: [
		            {
		                test: /\.css$/,
		                use: [
		                    {
		                        loader: "style-loader"
		                    }, {
		                        loader: "css-loader"
		                    }
		                ]
		            },
		            {
		                test: /(\.jsx|\.js)$/,
		                use: {
		                    loader: "babel-loader"
		                },
		                exclude: /node_modules/
		            },
		            {
		                test: /\.(png|jpg)$/,
		                use: {
		                    loader: "url-loader"
		                }
		            }
	        	   ]
    },
    externals: {  //将外部变量引入，或者将不想被打包的模块引入，页面必须使用require或者import引入，换用providerPlugin则无需引入 但必须安装该模块
	    "jquery": 'window.$',
	},
	plugins : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
		  "process.env": { 
		     NODE_ENV: JSON.stringify("production") 
		   }
		}),
        new webpack.optimize.CommonsChunkPlugin(
            {
            	names:['vendor']
            }
        )
	]
}