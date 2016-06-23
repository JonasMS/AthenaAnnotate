var cors = require('cors');
var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var homeRoute = require('./routes/home');
var apiRoute = require('./routes/api');
<<<<<<< 5dbee906751a4df0b10589444ca6f371c44ac280
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres@localhost:5432/annotate');
=======
var specRoute = require('./routes/spec');
>>>>>>> FEAT - Simple Insert span Tags
var host;
var port;

require('dotenv').config({ silent: true });

host = process.env.HOST || 'localhost';
port = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database: ', err);
  });

express()
  .use(cors({
    origin: '*',
    methods: ['GET, POST, OPTIONS'],
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
  .use(homeRoute)
  .listen(port);

process
  .stdout
  .write('Server listening on http://' + host + ':' + port + '. Use <ctrl-c> to stop server.\n');

module.exports = sequelize;
