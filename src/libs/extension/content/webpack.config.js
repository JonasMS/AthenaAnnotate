const path = require('path');
const webpack = require('webpack');
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, '../../../../build/extension'),
};

require('dotenv').config({ silent: true });

module.exports = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: 'content.js',
  },
  devtool: 'inline-sourcemap',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['ATHENA_HOST']),
  ],
};
