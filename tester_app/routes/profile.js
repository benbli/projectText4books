var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Get one user
router.get('/:id', function(req, res){
  var userId = req.params.id;
  User.findById(userId, function(err, databaseUser){
    res.json({users: databaseUser});
  })
})


module.exports = router;
