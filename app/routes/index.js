var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    pageTitle: 'index',
    pageID: 'home',
  });
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


// <img src="/images/img_002.jpg" alt="ceramics image" style=
// "height: 800px">
// <p>end of page</p>
