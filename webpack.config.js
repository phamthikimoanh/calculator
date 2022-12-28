const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
			},

			{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			templateContent: ({ htmlWebpackPlugin }) =>
				'<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
				htmlWebpackPlugin.options.title +
				'</title></head><body><div id="root"></div></body></html>',
			filename: 'index.html',
		}),
	],
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: './dist',
		},
		hot: true,
	},
};
