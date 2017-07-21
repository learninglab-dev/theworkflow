var express = require('express');
var router = express.Router();
var person = require('../models/person');
var shoot = require('../models/shoot');
// var bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Test Form' });
});

router.post('/', function(req, res, next) {
  var person_001 = new person({first_name: req.body.first_name, last_name: req.body.last_name, hire_date: req.body.thedate});
  person_001.save(function (err){
    if (err) console.log(err);
  });
  res.send(JSON.stringify(req.body) + 'was the full object and this is the person: ' + JSON.stringify(person_001));
  console.log('is this the full name? \n' + person_001.name);
});

module.exports = router;
