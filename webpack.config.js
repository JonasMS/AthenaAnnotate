var path = require('path');
var webpack = require('webpack');
var PATHS = {
  app: path.join(__dirname, 'src/client'),
  build: path.join(__dirname, 'build')
};
require('dotenv').config({ silent: true });

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'webapp.js'
  },
  devtool: 'inline-sourcemap',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['FACEBOOK_APP_ID', 'HOST', 'PORT', 'NODE_ENV'])
  ]
};
