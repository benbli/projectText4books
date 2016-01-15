// -----------------------------------
// ****** Modules + Middleware! ******
// -----------------------------------

// Express: Web-Application Framework
var express = require('express');
var app = express();

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

// Custom Middleware! - if a user token is included, find the user


// Handlebars template rendering
// var handlebars = require('handlebars');
// app.use(handlebars());

// EJS: Template Rendering
app.set('view engine', 'ejs');

// Mongoose! - Load and connect to our mongo database
// make sure to run mongod in another terminal window
var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/text4books'; // searches for MONGOLAB_URI first
var mongoose = require('mongoose');
mongoose.connect(mongoPath);


// ----------------------
// ****** Routing! ******
// ----------------------

// Index view
var index = require('./routes/index');
app.use('/', index);


// ---------------------
// ****** Listen! ******
// ---------------------
var port = 8080;
app.listen(port, function () {
  console.log('listening on ' + port);
});
