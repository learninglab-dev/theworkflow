var express = require('express');
var router = express.Router();


router.get('/three_test_001', function(req, res){
  var css='<link rel="stylesheet" type="text/css" href="/css/style.css">';
  // for CDN version of Tween and CreateJS,   <script src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>
  res.send(`
    <h1>THREE.js TEST 001</h1>
    ${css}
    <div id="webgl"></div>
    <script src="../lib/dat.gui.min.js"></script>
    <script src="../lib/Tween.js"></script>
    <script src="../lib/perlin.js"></script>
    <script src="../lib/three.js"></script>
    <script src="../lib/OrbitControls.js"></script>
    <script src="../js/main.js"></script>
    `);
});


router.get('/three_test/:testname', function(req, res){
  var css='<link rel="stylesheet" type="text/css" href="/css/style.css">';
  res.send(`
    ${css}
    <h1>THREE.js TEST: ${req.params.testname}</h1>
    <div id="webgl"></div>
    <script src="../lib/dat.gui.min.js"></script>
    <script src="../lib/Tween.js"></script>
    <script src="../lib/perlin.js"></script>
    <script src="../lib/three.js"></script>
    <script src="../lib/OrbitControls.js"></script>
    <script src="../js/${req.params.testname}.js"></script>
    `);
});

// router.get('/ins_outs/:shot', function(req, res){
//   var in_out_data = req.app.get('in_out_data')
//   var shot = in_out_data[req.params.shot];
//   res.send(`
//     <link rel="stylesheet" type="text/css" href="/css/style.css">
//
//     <h1>this is the angles page</h1>
//     <p>the angle id for ${shot.in} to ${shot.out} is ${shot.angle}
//     `);
// });

// router.get('/three_test/:shot', function(req, res){
//   var threeSites = req.app.get('data/three-sites')
//   var shot = threeSites[req.params.shot];
//   res.send(`
//     <link rel="stylesheet" type="text/css" href="/css/style.css">
//
//     <h1>this is the threejs routes page</h1>
//     <p>this is the route for ${shot.angle}</p>
//     `);
// });

module.exports = router;
