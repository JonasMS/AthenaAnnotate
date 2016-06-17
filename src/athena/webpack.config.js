var path = require('path');
var PATHS = {
  app: path.join(__dirname, 'src/client'),
  build: path.join(__dirname, '../server/libs')
};
require('dotenv').config({ silent: true });

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'athena.js'
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
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
