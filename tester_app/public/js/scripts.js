// Render current user
// function renderCurrentUser(user){
//   var username = $('<h2>').text(user.username);
//   var userId = $('<h3>').text(user.user._id);
// }


// Create users:

function createUser(userData, callback){
  $.ajax({
    method: 'post',
    url: '/api/users',
    data: {user: userData},
    success: function(data){
      var user = data.user;
      console.log('success create user: ', data);
      callback(user);
    }
  });
}

function setCreateUserHandler(){
  $('form.sign-up').submit(function(e){
    e.preventDefault();
    console.log('sign upppp');

    var usernameField = $(this).find('input[name="user[username]"]');
    var usernameText = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name="user[password]"]');
    var passwordText = passwordField.val();
    passwordField.val('');

    var emailField = $(this).find('input[name="user[email]"]');
    var emailText = emailField.val();
    emailField.val('');

    var collegeField = $(this).find('input[name="user[college]"]');
    var collegeText = collegeField.val();
    collegeField.val('');

    var userData = {
      username: usernameText,
      password: passwordText,
      email: emailText,
      college: collegeText
    };

    createUser(userData, function(user){
      console.log("User Data: ", userData);
      // console.log("user: ", user);
      $('#login-div').show();
      $('#sign-up-div').hide();
      updateView();
    });
  });
}

// Login Functions:

function login(username, password, callback) {
  callback = callback || function(){};
  console.log(username, password);
  $.ajax({
    method: 'post',
    url: '/api/users/authenticate',
    data: {
      username: username,
      password: password
    },
    success: function(data){
      // $('#textbook-user-id').val(username);
      console.log(username);
      $.cookie('token', data.token);
      callback(data);
      // console.log(username);
    }
  });
}

function setLoginFormHandler(){
  $('form#login').submit(function(e){
    e.preventDefault();

    var usernameField = $('#login-username');
    var username = usernameField.val();
    usernameField.val('');

    var passwordField = $('#login-password');
    var password = passwordField.val();
    passwordField.val('');

    login(username, password, function(){
      // renderTextbookForm(username);
      // console.log('login complete', data);
    });
  });
}

function setLogoutFormHandler(){
  $('#logout').click(function(){
    $.removeCookie('token');
  });
}

function toggleLogin(){
  $('#create-account').click(function(){
    $('#login-div').hide();
    $('#sign-up-div').show();
  });
  $('#already-user').click(function(){
    $('#login-div').show();
    $('#sign-up-div').hide();
  });
}

// Create Textbooks
function renderTextbookForm(user){
  var $textbookForm = $('<form>').addClass('user-only').prop('id', 'textbook-generator');
  // $textbookForm.append( $('<input type="hidden" name="user-id">').val(user._id) );
  $textbookForm.append( $('<input type="text" name="title" placeholder = "Textbook Title">') );
  $textbookForm.append( $('<input type="text" name="condition" placeholder = "Textbook Condition">') );
  $textbookForm.append( $('<input type="text" name="isbn" placeholder = "Textbook ISBN">') );
  $textbookForm.append( $('<input type="submit" value = "Sell Textbook">') );
  $('#textbook-form-div').append($textbookForm);
}

function setTextbookFormHandler(textbookData){
  $('#textbook-generator').submit(function(e){
    e.preventDefault();

    var titleField = $(this).find('input[name="title"]');
    var titleText = titleField.val();
    titleField.val('');

    var conditionField = $(this).find('input[name="condition"]');
    var conditionText = conditionField.val();
    conditionField.val('');

    var isbnField = $(this).find('input[name="isbn"]');
    var isbnText = isbnField.val();
    isbnField.val('');

    var userId = $(this).find('input[name="user-id"]');

    // var userId = req.body.user;
    // console.log(userId);

    textbookData = { title: titleText, condition: conditionText, isbn: isbnText};
    console.log(textbookData);

    createTextbook(userId, textbookData, function(textbook){
      updateView();
    })
  })
}

function createTextbook(userId, textbookData, callback){
  callback = callback || function(){};
  $.ajax({
    method: 'post',
    url: '/api/users/' + userId + '/textbooks',
    data: {textbooks: textbookData},
    success: function(data){
      console.log(userId);
      var textbook = data.textbooks;
      callback(textbook);
    }
  })
}

// Render Page:

function getAllUsers(callback){
  $.ajax({
    url: '/api/users',
    success: function(data){
      var users = data.users || [];
      callback(users);
      // console.log("users: " + users);
    }
  });
}

function renderTextbooks(textbooksArray){
  var source = $("#users-template").html();  // Go find the template
  var template = Handlebars.compile(source); // Create a template function
  var context = {textbooks: textbooksArray};  // What data will i pass the template?
  var textbookElement = template( context ); // Generate HTML
  return textbookElement;
}

function renderUsers(usersArray){
  var source = $("#users-template").html();  // Go find the template
  var template = Handlebars.compile(source); // Create a template function
  var context = {users: usersArray};  // What data will i pass the template?
  var usersElement = template( context ); // Generate HTML
  return usersElement;
}

function updateView(){
  getAllUsers(function(textbooks){
    $('section#users').empty();
    var textbookElement = renderTextbooks(textbooks);
    $('section#users').append(textbookElement);
  });


  if($.cookie('token')){
    console.log('cookie is present!');
    $('.user-only').show();
    $('.logged-out').hide();
    renderTextbookForm();
  } else {
    console.log("no cookies!");
    $('.user-only').hide();
    $('.logged-out').show();
  }
}

$(function(){
  setLoginFormHandler();
  setLogoutFormHandler();
  setCreateUserHandler();
  setTextbookFormHandler();
  updateView();
  toggleLogin();
});
