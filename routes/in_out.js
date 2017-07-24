var express = require('express');
var router = express.Router();
var moment = require('../models/moment');
// var bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('in_out', { title: 'The Workflow Ins and Outs' });
});

router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body) + " delivered at \n\n " + Date.now());
  // console.log(JSON.stringify(req.headers));
  // console.log(JSON.stringify(req._startTime));
  if(typeof req.body.in_point !== "undefined")
  {
    console.log("New in point at " + JSON.stringify(req.body.in_point));
  }
  if(typeof req.body.out_point !== "undefined")
  {
    console.log("New out point at " + req.body.out_point);
  }

  // var this_moment = new moment({shoot_id: req.body.shoot_id, in_ts: req.body.last_name, out: req.body.thedate});
  // person_001.save(function (err){
  //   if (err) console.log(err);
  // });
  // res.send(JSON.stringify(req.body) + 'was the full object and this is the person: ' + JSON.stringify(person_001));
  // console.log('is this the full name? \n' + person_001.name);
  res.redirect("/in_out");
});

module.exports = router;
