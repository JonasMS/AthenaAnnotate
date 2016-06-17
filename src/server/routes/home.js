var path = require('path');
var Router = require('express').Router;
var router = new Router();

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
