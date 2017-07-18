var express = require('express');
var router = express.Router();


router.get('/form', function(req, res){
  res.render('partials/template/form', {
    pageTitle: 'form',
    pageID: 'form',
    testVar: 'test string here'
  });
});

router.get('/form_02', function(req, res) {
  res.render('form_02', {
    pageTitle: 'form 2',
    pageID: 'form 2',
    testVar: 'test string for form 2'
  });
});

module.exports = router;
