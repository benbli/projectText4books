// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();

// --------------------
// ****** Route! ******
// --------------------
router.get('/', function(req, res){
  res.render('index', {title: 'Text4Books'});
});

router.get('/sell', function(req, res){
  res.render('sell')
});

router.get('/profile', function(req, res){
  res.render('profile', {title: 'User Profile'})
})

// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
