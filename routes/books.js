var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var User = require('../models/user');


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Get all textbooks
router.get('/', function(req, res){
  if (req.query.college){
    Book.find({college: req.query.college, status: req.query.status}, function(err, databaseTextbooks){
      res.json({textbooks: databaseTextbooks})
    })
  } else if (req.query.user){
    Book.find({user_id: req.query.user}, function(err, databaseTextbooks){
      res.json({user_id: databaseTextbooks})
    })
  } else {
    Book.find({}, function(err, databaseTextbooks){
      res.json({databaseTextbooks})
    })
  }
});

// Create Textbook
router.post('/', function(req, res){
  var bookData = req.body;
  var newBook = new Book(bookData);
  newBook.save(function(err, databaseBook){
    res.json(databaseBook);
  })
})

// Get one textbook
router.get('/:id', function(req, res){
  var textbookId = req.params.id;
  Book.findOne({_id: textbookId}, function(err, databaseTextbook){
    res.json(databaseTextbook);
  })
})

// Update the textbook to sold
router.patch('/:id', function(req, res){
  var textbookId = req.params.id;
  var textbookStatus = req.body.status
  console.log('req.body =', req.body);
    Book.findByIdAndUpdate(textbookId, {status: textbookStatus}, function(err, databaseTextbook){
        res.json(databaseTextbook);
    });
})

// Delete textbook
router.delete('/:id', function(req, res){
  var textbookId = req.params.id;
  Book.findByIdAndRemove(textbookId, function(err, databaseTextbook){
    res.json(databaseTextbook)
  });
});

module.exports = router;
