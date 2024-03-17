const path = require('path');

module.exports = {
	entry: './web/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'web', 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	resolve: {
		fallback: {
			"fs": false,
			"path": false,
		}
	},
	optimization: {
		minimize: false,
	},
};
