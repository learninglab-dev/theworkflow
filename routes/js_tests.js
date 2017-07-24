var express = require('express');
var router = express.Router();

router.get('/001', function(req, res, next) {
  res.render('js_test_001', { title: 'js test zone' });
});


router.get('/clock', function(req, res, next) {
  res.render('clock', { title: 'js clock test' });
});

module.exports = router;
