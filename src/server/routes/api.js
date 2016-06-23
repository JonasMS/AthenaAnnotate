var path = require('path');
var Router = require('express').Router;
var router = new Router();

router.post('/api/users', function(req, res) {
  var user = {
    id: req.body.id,
    facebook: {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    }
  };
  console.log(req.body, '<-- from /api/users');
  res.json(user);
});

router.get('/api/athena', function(req, res) {
  res.sendFile(path.join(__dirname, '../../../build/libs/athena.js'));
});

router.post('/api/create', function(req, res) {
  console.log(req.body);
  res.end();
});

module.exports = router;
