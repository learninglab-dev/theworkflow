var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

router.get('/people', function(req, res){
  var personList='<p>here will be the person list</p>';
  var size=100;
  var people_data = req.app.get('people_data')
  people_data.forEach(function(person){
    size+=100;
    personList += `
    <li>
      ${person.Name} (${person.Role})
      </br>
      ${person.Image}
      </br>
    </li>
    `
  });
  res.send(`
    <h1>Testing Testing</h1>
    <ul>
    ${personList}
    </ul>
    `);
});



router.get('/people/:id', function(req, res){
  var people_data = req.app.get('people_data')
  var personId = people_data[req.params.id];
  console.log(personId);
  console.log("hopefully image coming \n");
  console.log(personId.Image);
  res.render('person', {
    pageTitle: `person: ${personId.Name}`,
    pageID: 'person',
    theMessage: 'just a test here',
    image_embed: personId.Image
  });
});


module.exports = router;
