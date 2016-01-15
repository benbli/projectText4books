console.log('scripts loaded');


function createUser(userData, callback){
  $.ajax({
    method: 'post',
    url: '/api/users',
    data: {user: userData},
    success: function(data){
      callback(data);
    }
  })
}

function setCreateUserHandler(){
  $('form.sign-up').submit(function(e){
    e.preventDefault();

    var usernameField = $('#signup-username');
    var usernameText = usernameField.val();
    usernameField.val('');

    var passwordField = $('#signup-password');
    var passwordText = passwordField.val();
    passwordField.val('');

    var emailField = $('#signup-email');
    var emailText = emailField.val();
    emailField.val('');

    var collegeField = $('#signup-college');
    var collegeText = collegeField.val();
    collegeField.val('');

    var userData = {
      username: usernameText,
      password: passwordText,
      email: emailText,
      college: collegeText
    };

    createUser(userData, function(user){
      console.log(userData);
      updateUsersAndView();
    })
  })
}


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
      // console.log('login complete', data);
    });
  });
}
// render users in a Handlebar template
// function renderUsers(users) {
//   var source = $('users-template').html();    // find the template
//   var template = Handlebars.compile(source);  // create the template
//   var context = {users: usersArray};    // data that gets passed
//   var usersElement = template(context);  // generate the template
//   return usersElement;
// }


function setLogoutFormHandler(){
  $('#logout').click(function(){
    $.removeCookie('token');
  });
};

function getAllUsers(callback){
  $.ajax({
    method: 'get',
    api: '/api/users',
    success: function(data){
      var users = data.users || [];
      callback(users)
      console.log("users: " + data);
    }
  });
}

function renderUsers(usersArray){
  var source = $("#users-template").html();  // Go find the template
  var template = Handlebars.compile(source); // Create a template function
  var context = {users: usersArray};  // What data will i pass the template?
  var usersElement = template( context ); // Generate HTML
  return usersElement;
}

function updateUsersAndView(){

  getAllUsers(function(users){
    $('section#users').empty();
    var usersElement = renderUsers(users);
    $('section#users').append(usersElement);
  });

  if($.cookie('token')){
    console.log('cookie is present!');
    $('.user-only').hide();
  } else {
    console.log("no cookies!");
    $('.user-only').show();
  }
}

$(function(){
  setLoginFormHandler();
  setLogoutFormHandler();
  setCreateUserHandler();
  updateUsersAndView();
})
