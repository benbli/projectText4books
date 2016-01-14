var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res){
  var userData = req.body.user;
  var newUser = new User(userData);

  newUser.save(function(err, databaseUser){
    res.redirect('/';)
  });
});

router.post('/authenticate', function(req, res){
  console.log("trying to authenticateeeee");
  var usernameTry = req.body.username;
  var passwordTry = req.body.password;
  User.findOne({ username: usernameTry }, function(err, databaseUser){
    databaseUser.authenticate(passwordTry, function(err, isMatch){
      if(isMatch){
        databaseUser.setToken(function(){
          res.json({description: "Correct Password!!!", token: databaseUser.token });
        })
      } else {
        res.json({description: "Sorry, wrong passwordddd"});
      };
    });
  });
});

router.delete('/', function(req, res){
  console.log("logging outtttt");
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username}, function(databaseUser){
    databaseUser.deleteToken()
  });
});

module.exports = router;
