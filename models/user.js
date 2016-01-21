var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var Book = require('./book');

var UserSchema = mongoose.Schema({
  username: { type: String, required: true }, // NEED TO ADD REQUIRE
  password: { type: String, required: true }, // password_digest && NEED TO ADD REQUIRE
  college: { type: String, required: true },  // change this to bio schema so that we can put user's info all in one place
  email: { type: String, required: true },
  token: { type: String }  // crypto - API token based auth. A location to place the token
});


UserSchema.pre('save', function(next){  // BEFORE save happens
  if(this.isModified('password')){  // if password has changed
    this.password = bcrypt.hashSync(this.password, 10);  // hash the password
  }
  return next();
});

UserSchema.methods.authenticate = function(passwordTry, callback){
  // Check if password is correct...
  bcrypt.compare(passwordTry, this.password, function(err, isMatch){
    if(err){ return callback(err); }
    callback(null, isMatch);  // call the callback
  });
};

UserSchema.methods.setToken = function(callback){
  var scope = this;
  crypto.randomBytes(256, function(err, rawToken){  // generating a crazy nonsense
    scope.token = rawToken;
    scope.save(function(){
      callback();
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
