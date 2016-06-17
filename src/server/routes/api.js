var path = require('path');
var Router = require('express').Router;
var router = new Router();

router.get('/api/athena', function(req, res) {
  res.sendFile(path.join(__dirname, '../../../build/libs/athena.js'));
});

module.exports = router;
