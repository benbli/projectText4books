// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();
var User = require('../models/user');

// --------------------
// ****** Route! ******
// --------------------
router.get('/', function(req, res){
  res.render('index', {title: 'Text4Books'});
});

router.get('/book', function(req, res){
  res.render('book')
});

router.get('/profile', function(req, res){
  res.render('profile', {title: 'User Profile'})
})

router.get('/books/:id', function(req, res){
  var textbookId = req.params.id;
  User.findOne({'textbooks._id' : textbookId}, function(err, databaseTextbook){
    res.render('book', {textbook : databaseTextbook})
  })
})

// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
