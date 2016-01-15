console.log('scripts loaded');

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

$(function(){
  setLoginFormHandler();
});
