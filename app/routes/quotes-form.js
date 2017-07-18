var express = require('express');
var router = express.Router();


router.get('/form', function(req, res){
  res.render('form', {
    quotes: ['form', 'quote 2', 'quote 3'],
    pageID: 'form',
    testVar: 'test string here'
  });
});


module.exports = router;
