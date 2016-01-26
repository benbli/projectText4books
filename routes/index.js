// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Book = require('../models/book')

// --------------------
// ****** Route! ******
// --------------------
router.get('/', function(req, res){
  res.render('index', {title: 'Text4Books'});
});

// router.get('/book', function(req, res){
//   res.render('book')
// });

router.get('/profile', function(req, res){
  res.render('profile', {title: 'User Profile'})
})

router.get('/:id', function(req, res){
  var textbookId = req.params.id;
  Book.findById(textbookId, function(err, databaseTextbook){
    console.log(textbookId);
    console.log('databaseTextbook: ', databaseTextbook);
    res.render('book', {textbook: databaseTextbook})
  });
})

// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
