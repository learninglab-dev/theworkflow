var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home for l_express', pageID: 'home' });
});



router.get('/bootstrap-index', function(req, res){
  res.render('bootstrap-index', {
    pageTitle: 'bootstrap-index',
    pageID: 'bootstrap-index',
  });
});

router.get('/layout', function(req, res){
  res.render('layout', {
    pageTitle: 'layout',
    pageID: 'layout',
  });
});



module.exports = router;
