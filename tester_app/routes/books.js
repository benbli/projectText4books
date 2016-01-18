var express = require('express');
var router = express.Router();
// var Book = require('../models/book');




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


module.exports = router;
