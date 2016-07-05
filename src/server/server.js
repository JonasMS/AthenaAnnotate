require('dotenv').config({ silent: true });

var fs = require('fs');
var http = require('http');
var https = require('https');
var cors = require('cors');
var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var homeRoute = require('./routes/home');
var apiRoute = require('./routes/api');
var specRoute = require('./routes/spec');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL);
var server = express();
var host = process.env.HOST || 'localhost';
var httpPort = process.env.HTTP_PORT || 3000;
var httpsPort = process.env.HTTPS_PORT || 8443;

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database: ', err);
  });

server
  .use(cors({
    origin: '*',
    methods: ['GET, POST, OPTIONS, DELETE, PUT'],
    allowHeaders: 'content-type, accept',
    credentials: true,
    maxAge: 10
  }))
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.static(__dirname + '/../../build'))
  .use(session({
    secret: 'athena annotate',
    resave: false,
    saveUninitialized: false
  }))
  .use(apiRoute)
  .use(specRoute)
  .use(homeRoute);

var privateKey;
var certificate;
var credentials;
var env = process.env.NODE_ENV;

if (env === 'production') {
  http
    .createServer(server)
    .listen(httpsPort);

  console.log('[HTTP]: Server listening on http://' + host + ':' + httpsPort + '\n');
} else {
  http
    .createServer(server)
    .listen(httpPort);

  console.log('[HTTP]: Server listening on http://' + host + ':' + httpPort + '\n');

  privateKey  = fs.readFileSync(__dirname + '/sslcert/server.key', 'utf8');
  certificate = fs.readFileSync(__dirname + '/sslcert/server.crt', 'utf8');
  credentials = { key: privateKey, cert: certificate };

  https
    .createServer(credentials, server)
    .listen(httpsPort);

  console.log('[HTTPS]: Server listening on https://' + host + ':' + httpsPort + '\n');
}

console.log('\nUse <ctrl-c> to stop servers.\n\n');

module.exports = sequelize;
