var express = require('express');
var router = express.Router();


router.get('/form', function(req, res){
  res.render('partials/template/form', {
    pageTitle: 'form',
    pageID: 'form',
    testVar: 'test string here'
  });
});


module.exports = router;
