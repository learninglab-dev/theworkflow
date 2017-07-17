var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    pageTitle: 'index',
    pageID: 'home',
  });
});

module.exports = router;


// <img src="/images/img_002.jpg" alt="ceramics image" style=
// "height: 800px">
// <p>end of page</p>
