var path = require('path');
var Router = require('express').Router;
var router = new Router();

router.get('/api/test', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/spec/basic.html'));
});

module.exports = router;
