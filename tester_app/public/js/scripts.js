
// Create users:
function createUser(userData, callback){
  $.ajax({
    method: 'post',
    url: '/api/users',
    data: {user: userData},
    success: function(data){
      console.log('success create user: ', data); // data.user is undefined...
      callback(data);
    }
  });
}

function setCreateUserHandler(){
  $('form.sign-up').submit(function(e){
    e.preventDefault();

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
      console.log("User : ", user);
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
      $.cookie('token', data.token);
      $.cookie('user-id', data.id);
      var userId = data.id;
      setUserLoginView();
      // setTextbookUserId(userId);
      setTextbookFormHandler();
      // setTextbookFormHandler();
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

    login(username, password, function(callback){
      // setTextbookUserId(data);
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

function setTextbookUserId(userId){
  $('input[name="textbook-user-id"]').val('test');
};

function setTextbookFormHandler(textbookData, data, callback){
  $('body').on('submit', 'form#book-form', function(e){
    e.preventDefault();

    var titleField = $(this).find('input[name="textbook-title"]');
    var titleText = titleField.val();
    titleField.val('');

    var conditionField = $(this).find('input[name="condition"]');
    var conditionText = conditionField.val();
    conditionField.val('');

    var isbnField = $(this).find('input[name="isbn"]');
    var isbnText = isbnField.val();
    isbnField.val('');

    var setUserId = $(this).find('input[name="textbook-user-id"]').val($.cookie('user-id'));
    var userId = setUserId.val()
    console.log('user-id val: ' , userId);

    textbookData = { title: titleText, condition: conditionText, isbn: isbnText };

    createTextbook(userId, textbookData, function(textbook){
      updateView();
    })
  })
}

function createTextbook(userId, textbookData, callback){
  callback = callback || function(){};
  // console.log();
  $.ajax({
    method: 'post',
    url: '/api/users/' + userId + '/textbooks',
    data: {textbook: textbookData},
    success: function(data){
      console.log(userId);
      var textbook = data.textbook;
      callback(textbook);
    }
  })
}

// Render Page:
function getAllTextbooks(callback){
  $.ajax({
    url: '/api/users/' + userId + '/textbooks',
    success: function(data){
      var textbooks = data.textbooks || [];
      callback(textbooks);
      console.log("textbooks: ", textbooks);
    }
  })
}

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
};


function setUserLoginView(){
  if($.cookie('token')){
    console.log('cookie is present!');
    $('.user-only').show();
    $('.logged-out').hide();
  } else {
    console.log("no cookies!");
    $('.user-only').hide();
    $('.logged-out').show();
  }
};

$(function(){
  setLoginFormHandler();
  setLogoutFormHandler();
  setCreateUserHandler();
  // setTextbookFormHandler();
  updateView();
  toggleLogin();
});
