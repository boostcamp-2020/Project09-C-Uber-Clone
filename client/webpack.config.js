/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    overlay: true,
    stats: 'errors-only',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
