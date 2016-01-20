var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var User = require('../models/user');


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  res.json('http://isbndb.com/api/v2/json/ZWOQIN7L/books?q=science', function (data) {
    console.log(data);
  });
});

// Get all textbooks
router.get('/', function(req, res){
  Book.find({}, function(err, datbaseTextbooks){
    console.log('book: ',databaseTextbooks);
    res.json({textbooks: databaseTextbooks})
  })
})
//
// router.get('/', function(req, res){
//   User.find(req.query.college? {college: req.query.college} : {}, function(err, databaseUsers){
//     console.log(req.query)
//     res.json({users: databaseUsers});
//   });
// });


// Get one textbook
router.get('/:id', function(req, res){
  var textbookId = req.params.id;
  console.log('user id: ', textbookId);
  User.findOne({'textbooks._id' : textbookId}, function(err, databaseTextbook){
    res.json(databaseTextbook)
  })
})

// Update the textbook to sold
router.patch('/:id', function(req, res){
  if(req.user){
    var textbookId = req.params.id;

    Book.findByIdAndUpdate(textbookId, {new : true}, function(err, databaseTextbook){
      res.json(databaseTextbook);
    })
  }
})
module.exports = router;
