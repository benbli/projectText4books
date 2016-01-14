// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();

// --------------------
// ****** Route! ******
// --------------------
router.get('/', function(req, res){
  res.render('index', {title: 'text4books'});
});

// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
