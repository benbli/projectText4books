// -----------------------------------
// ****** Modules + Middleware! ******
// -----------------------------------

// Express: Web-Application Framework
var express = require('express');
var app = express();

// Hide API key
require('dotenv').load();
console.log(process.env.W_API_KEY);


// Morgan: Request Logging
var morgan = require('morgan');
app.use(morgan('dev'));

// Public: Set publically accessible directory
app.use(express.static('./public'));

// Body Parser: Read all the body information
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Cookie Parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware:
var loaduser = require('./middleware/loadUser');
app.use(loaduser);



// EJS: Template Rendering
app.set('view engine', 'ejs');

// Mongoose! - Load and connect to our mongo database
// make sure to run mongod in another terminal window
var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/text4books'; // searches for MONGOLAB_URI first (heroku thing)
var mongoose = require('mongoose');
mongoose.connect(mongoPath);


// ----------------------
// ****** Routing! ******
// ----------------------

// Index view
var index = require('./routes/index');
app.use('/', index);

var users = require('./routes/users');
app.use('/api/users', users);

var profile = require('./routes/profile');
app.use('/profile', profile);

var books = require('./routes/books');
app.use('/api/book', books);

// ---------------------
// ****** Listen! ******
// ---------------------
var port = process.env.PORT || 8080;  // heroku will give us PORT
app.listen(parseInt(port), function (err) {
  if (err) {
    throw err;
  }
  console.log('listening on ' + port);
});
