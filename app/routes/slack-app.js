'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const dotenv = require('dotenv');
dotenv.config();


// move to using mongoose?

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test_db', function (err) {
// if (err) throw err;
// });

var port = process.env.PORT || 3000;
let mdb;
MongoClient.connect(process.env.DB_URL, (err, db) => {
// on local machine
// MongoClient.connect(process.env.DB_URL, (err, db) => {
  if (err) return console.log(err)
  mdb = db
  router.listen(port, function() {
    console.log('Mongo connected and listening on ' + port);
  });
  // ... start the server
});


// var server = app.listen(port, function(){
//   console.log("App running on port " + port);
// });
//
router.post('/slack_20170715', (req, res) => {
  let text = req.body.text;
  console.log(text);
  var thisTime = Date.now();
  var message = "message received at " + thisTime;
  console.log(req);
  let data = {
  response_type: 'in_channel', // public to the channel
  text: message,
  attachments:[ {image_url: 'https://media.giphy.com/media/vooluv4uvvi8g/giphy.gif'} ]
            };
  req.body.timestamp = thisTime;
  mdb.collection('slack_20170715').save(req.body, function(err, result){
     if (err) return console.log(err)
     else {
       console.log('saved to the database');
     }
  });
  res.json(data);
});

router.locals.siteTitle = 'slack app tests';

router.use(express.static('./public'));
// app.use(require('./routes/index'));
router.use(require('./routes/form'));

router.get('/', function(req, res){
  // res.send('Hello')
  mdb.collection('slack_20170715').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index', {slackdata: result})
  })
});
//
// app.get ('/slack', function (req, res){
//   let data = {form: {
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     code: req.query.code
//   }};
//   request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // You are done.
//       // If you want to get team info, you need to get the token here
//       let token = JSON.parse(body).access_token; // Auth token
//     }
//   });
// });

router.get('/auth', (req, res) =>{
    res.sendFile(__dirname + '/public/add_to_slack.html')
})

router.get('/auth/redirect', (req, res) =>{
    console.log('in the redirect function');
    console.log(req.query.code);
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
})


// or instead of above
// ...
// request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     let team = JSON.parse(body).team.domain;
//     res.redirect('http://' +team+ '.slack.com');
//   }
// });


router.get('/slacksignup', function(req, res){
    res.render('slacksignup')
});



router.post('/quotes', function (req, res) {
  mdb.collection('quotes').save(req.body, function(err, result) {
    if (err) return console.log(err)
    else {
      console.log('saved to database')
      res.redirect('/')
    }
  });
});


function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}

router.post('/slack-marker', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
    if (reqBody.token != process.env.VERIFICATION_TOKEN){
        res.status(403).end("Access forbidden")
    }else{
        var message = {
            "text": "This is your first interactive message",
            "attachments": [
                {
                    "text": "Building buttons is easy right?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "yes",
                            "text": "yes",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "no",
                            "text": "no",
                            "type": "button",
                            "value": "no"
                        },
                        {
                            "name": "maybe",
                            "text": "maybe",
                            "type": "button",
                            "value": "maybe",
                            "style": "danger"
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})


router.post('/marker-button', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    var message = {
        "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
        "replace_original": false
    }
    console.log('response_url from actionJSONPayload:');
    console.log(actionJSONPayload.response_url);
    sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
    mdb.collection('button-presses').save(req.body, function(err, result){
       if (err) return console.log(err)
       else {
         console.log('saved to the database');
       }
    });
})

console.log('it is working');
