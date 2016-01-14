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
    };
    success: function(data){
      $.cookie('token', data.token);
      callback(data);
    }
  })
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

    login(username, password, function(data){
      console.log('login complete', data);
    });
  });
};

$(function(){
  setLoginFormHandler();
})
