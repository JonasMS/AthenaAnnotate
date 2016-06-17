var path = require('path');
var Router = require('express').Router;
var router = new Router();

router.get('/api/athena', function(req, res) {
  res.sendFile(path.join(__dirname, '../../../build/libs/athena.js'));
});
router.post('/api/create', function(req, res) {
  console.log(req.body);
  res.end();
});

module.exports = router;
