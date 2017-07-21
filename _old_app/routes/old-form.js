// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({
//     extended: true
// }));
// router.use(bodyParser.json());
//
// router.get('/form', function(req, res){
//   res.render('partials/template/form', {
//     pageTitle: 'form',
//     pageID: 'form',
//     testVar: 'test string here'
//   });
// });
//
// router.get('/form_02', function(req, res) {
//   res.render('form_02', {
//     pageTitle: 'form 2',
//     pageID: 'form 2',
//     testVar: 'test string for form 2'
//   });
// });
//
//
// router.post('/form_02_response', function (req, res) {
//   // mdb.collection('quotes').save(req.body, function(err, result) {
//   //   if (err) return console.log(err)
//   //   else {
//   //     console.log('saved to database')
//   //     res.redirect('/')
//   //   }
//   // });
//     console.log(JSON.stringify(req.body));
//     res.send(JSON.stringify(req.body));
// });
//
//
// module.exports = router;
