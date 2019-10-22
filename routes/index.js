var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const myJson = { firstName: "First", lastName: "Last" };
router.get('/json', function(req, res, next) {
  res.json(myJson);
});

module.exports = router;
