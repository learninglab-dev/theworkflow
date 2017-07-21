var express = require('express');
var app = express();
var in_out_file = require('./app/data/in_out.json');
var slackStats = require('./app/data/slackStats.json');
var shoots_2017_06 = require('./app/data/2017_06_shoots.json');
var people_data_file = require('./app/data/people.json');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const dotenv = require('dotenv');
dotenv.config();
// var mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);
// var port = process.env.PORT || 3000;
app.set('in_out_data', in_out_file);
app.set('people_data', people_data_file);
app.set('shoot_data_2017_06', shoots_2017_06);
app.set('view engine', 'ejs');
// app.set('views', 'app/views');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var users = require('./routes/users');
var form = require('./routes/form');
var old_index = require('./routes/old_index');
var ins_outs = require('./routes/ins_outs');
var people = require('./routes/people');
var shoot = require('./routes/shoot');
var three_routes = require('./routes/three_routes');

// var server = app.listen(port, function(){
//   console.log("App running on port " + port);
// });
//
// let mdb;
// MongoClient.connect(process.env.DB_URL, (err, db) => {
//   if (err) return console.log(err)
//   mdb = db
//   app.listen(port, function() {
//     console.log('Mongo connected and listening on ' + port);
//   });
//   // ... start the server
// });

app.locals.siteTitle = 'theworkflow';

app.use('/', index);
app.use('/users', users);
app.use('/form', form);
app.use('/old_index', old_index);
// app.use('/old_forms', old_forms);
app.use('/ins_outs', ins_outs);
app.use('/people', people);
app.use('/shoot', shoot);
app.use('/three_routes', three_routes);
// app.use(require('./app/routes/slack-app'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var mongodbUri = process.env.DB_URL;
mongoose.connect(mongodbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var SegmentSchema = new mongoose.Schema({
  request_timestamp : String,
  in_offset : String,
  in_point :  String,
  shoot_id :  String,
  updated : { type: Date, default: Date.now}
});

var Segment = mongoose.model('Segment', SegmentSchema);

var Segment_0001 = new Segment({shoot_id: '20170719_001_Test_Test'});

Segment_0001.save(function (err){
  if (err) return handleError(err);
});




app.get('/index2', function (req, res) {
  res.send(`
    <h1>index2 in here</h1>
    `);
})

app.post('/myaction', (req, res) => {
  console.log("got a req");
  console.log(JSON.stringify(req.body));
  res.send('You sent the object ' + JSON.stringify(req.body))
});


app.post('/the-action', (req, res) => {
  console.log("got a req");
  console.log(JSON.stringify(req.body));
  // res.send('You sent the object ' + JSON.stringify(req.body))
  res.redirect('/bootstrap-index');
});

app.post('/slack_20170715', (req, res) => {
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
  var marker = require('./models/marker');
  var new_marker = new marker({payload: req.body});
  new_marker.save(function (err){
    if (err) console.log(err);
  });
  res.json(data);
});



// var server = app.listen(app.get('port'), function(){
//   console.log(`listening on port ${app.get('port')} . . .`);
// });


app.get('/auth', (req, res) =>{
    res.sendFile(__dirname + '/public/add_to_slack.html')
})

app.get('/auth/redirect', (req, res) =>{
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


app.get('/slacksignup', function(req, res){
    res.render('slacksignup')
});



// app.post('/quotes', function (req, res) {
//   mdb.collection('quotes').save(req.body, function(err, result) {
//     if (err) return console.log(err)
//     else {
//       console.log('saved to database')
//       res.redirect('/')
//     }
//   });
// });


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

app.post('/slack-marker', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
    if (reqBody.token != process.env.VERIFICATION_TOKEN){
        res.status(403).end("Access forbidden")
    }else{
        var message = {
            "text": "This slash command will log a request for an \"in\" point to the server", "attachments": [
                {
                    "text": "can you guess how long ago the magic moment started?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "theworkflow_marker_button",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "5-min",
                            "text": "5 minutes ago",
                            "type": "button",
                            "value": "300"
                        },
                        {
                            "name": "2-min",
                            "text": "2 minutes ago",
                            "type": "button",
                            "value": "120"
                        },
                        {
                            "name": "60-sec",
                            "text": "60 seconds ago",
                            "type": "button",
                            "value": "60",
                        },
                        {
                            "name": "30-sec",
                            "text": "30 seconds ago",
                            "type": "button",
                            "value": "30",
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})



app.post('/marker-button', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    var message = {
        "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
        "replace_original": false
    }
    var marker = require('./models/marker');
    var new_marker = new marker({payload: actionJSONPayload});
    new_marker.save(function (err){
      if (err) console.log(err);
    });
    res.send(JSON.stringify(req.body) + 'was the full object and this is the person: ' + JSON.stringify(person_001));
    console.log('is this the full name? \n' + marker.payload.user.name);
    console.log('response_url from actionJSONPayload:');
    console.log(actionJSONPayload.response_url);
    sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
})

console.log('it is working');
