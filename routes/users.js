var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var User = require('../models/user');

// Get all users
router.get('/', function(req, res){
  User.find({}, function(err, databaseUsers){
  User.find(req.query.college? {college: req.query.college} : {}, function(err, databaseUsers){
    console.log(req.query)
    res.json({users: databaseUsers})
   })
 })
});

// Get one user
router.get('/:id', function(req, res){
  var userId = req.params.id;
  User.findById(userId, function(err, databaseUser){
    res.json({users: databaseUser});
  })
})

// Create User
router.post('/', function(req, res){
  var userData = req.body.user;  // data sent
  var newUser = new User(userData);  // make a new user using the data sent
    // may look like: req.body.user = {username: 'lichard', password: '1234'}
  newUser.save(function(err, databaseUser){  // save user to the database
    res.json(databaseUser);
  });
});

// Authenticate login attempt
router.post('/authenticate', function(req, res){      // POST to /api/users/authenticate
  console.log("trying to authenticateeeee with TOKEN");
  var usernameTry = req.body.username;
  var passwordTry = req.body.password;
  var id = req.body.id;
  console.log("username attempt: " + usernameTry);
  // find user by username
  User.findOne({ username: usernameTry }, function(err, databaseUser){
    databaseUser.authenticate(passwordTry, function(err, isMatch){
      if(isMatch){
        databaseUser.setToken(function(){
          res.json({username: databaseUser.username, college: databaseUser.college, id: databaseUser.id, email: databaseUser.email, description: "Correct Password!!!", token: databaseUser.token });  // send token as json
        });
      } else {
        res.json({description: "Sorry, wrong passwordddd", status: 302});
      }
    });
  });
});

// Logout (delete token)
router.delete('/', function(req, res){
  console.log("logging outtttt");
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username}, function(databaseUser){
    databaseUser.deleteToken();
  });
});

// Create a textbook
// router.post('/:id/textbooks', function(req, res){
//   var textbookBody = req.body.textbook || {};
//   // textbookBody.id = req.user.id;
//   var userId = req.params.id;
//   console.log('userId var: ', userId);
//   User.findById(userId, function(err, databaseUser){
//     var textbookNumber = databaseUser.textbooks.push(textbookBody);
//     databaseUser.save(function(err){
//       res.json({textbook: databaseUser.textbooks[textbookNumber-1]});
//     });
//   });
// });

// UPDATE the user's bio (going to add more bio information)
router.patch ('/', function (req, res) {
  if(req.user){
    req.user.bio = req.body.user.bio; // modify the user's bio

    req.user.save(function (err, databaseUser) {
      res.json(databaseUser);
    });
  }
});


module.exports = router;
