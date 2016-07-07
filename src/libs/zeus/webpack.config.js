const path = require('path');
const webpack = require('webpack');
const config = require('../../../config');
const baseUrl = process.env.NODE_ENV === 'production'
              ? config.url.host
              : `${config.url.host}:${config.url.port}`;

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, '../../../build/zeus'),
};

require('dotenv').config({ silent: true });

module.exports = {
  entry: {
    app: PATHS.app,
  },
  output: {
    publicPath: baseUrl + '/zeus/',
    path: PATHS.build,
    filename: 'zeus.js',
  },
  devtool: 'inline-sourcemap',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      // {
      //   test: /\.css$/,
      //   // loaders: ExtractTextPlugin.extract('style', 'css'),
      //   loader: 'style',
      // },
      // {
      //   test: /\.css$/,
      //   loader: 'css?root=https://localhost:3000',
      // },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.png$/,
        loader: 'url?limit=100000',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jpg$/,
        loader: 'file',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['HOST', 'PORT', 'NODE_ENV']),
    // new ExtractTextPlugin('bundle.css'),
  ],
};
