var express = require('express');
var router = express.Router();


router.get('/ins_outs', function(req, res){
  var info='  <link rel="stylesheet" type="text/css" href="/css/style.css">';
  var size=100;
  var in_out_data = req.app.get('in_out_data')
  in_out_data.forEach(function(item){
    size+=100;
    info += `
    <li>
      <h2>The in is ${item.in}</h2>
      <h2>And the out is ${item.out}</h2>
    </li>
    <img src="/images/img_001.jpg" alt="ceramics image" style=
    "height: ${size}px">
    `
  });
  res.send(`
    <h1>Testing Testing</h1>
    ${info}
    `);
});

router.get('/ins_outs/:id', function(req, res){
  var in_out_data = req.app.get('in_out_data')
  var shot = in_out_data[req.params.id];
  res.send(`
    <link rel="stylesheet" type="text/css" href="/css/style.css">

    <h1>this is the angles page</h1>
    <p>the angle id for ${shot.in} to ${shot.out} is ${shot.angle}
    `);
});

module.exports = router;
