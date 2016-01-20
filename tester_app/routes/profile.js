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

// UPDATE the user's bio (going to add more bio information)
router.patch ('/:id/textbooks/:id', function (req, res) {
  if(req.user){
    var userId = req.user.id;
    req.user.textbooks = req.body.user.textbooks; // modify the user's bio

    req.user.save(function (err, databaseUser) {
      res.json(databaseUser);
    });
  }
});


module.exports = router;
