var express = require('express');
var app = express();
var in_out_file = require('./app/data/in_out.json');
var slackStats = require('./app/data/slackStats.json');
var shoots_2017_06 = require('./app/data/2017_06_shoots.json');
var people_data_file = require('./app/data/people.json');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const dotenv = require('dotenv');
dotenv.config();

app.set('port', process.env.PORT || 3000);
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('in_out_data', in_out_file);
app.set('people_data', people_data_file);
app.set('shoot_data_2017_06', shoots_2017_06);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'three.js tests';

app.use(express.static('./app/public'));
app.use(require('./app/routes/index'));
app.use(require('./app/routes/ins_outs'));
app.use(require('./app/routes/three_routes'));
app.use(require('./app/routes/shoot'));
app.use(require('./app/routes/people'));
app.use(require('./app/routes/form'));
app.use(require('./app/routes/slack'));


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



// var server = app.listen(app.get('port'), function(){
//   console.log(`listening on port ${app.get('port')} . . .`);
// });

var server = app.listen(port, function(){
  console.log("App running on port " + port);
});
