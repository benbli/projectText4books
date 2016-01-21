<<<<<<< HEAD
// console.log("landing");
//
// $(function(){
//   $('.sign-up').hide();
//   $('#login').hide();
//
// });
//
//
// document.getElementById('already-user').addEventListener("click", renderSignForm);
//
// function renderSignForm(){
//   document.getElementsByClassName('sign-up').show();
// }
//
//
=======
console.log("landing");

$(function(){
  $('.sign-up').hide();
  $('#login').hide();
  renderLogForm();
  renderSignForm();
  renderSignFormTwo();

});

// this works
function renderLogForm(){
  console.log('cela marche? is it running?');

  $('#already-user').on('click', function(e){
    e.preventDefault();
    console.log('cela marche? 3 ');
    $('#login').show();
    console.log('cela marche? part deux');
  });
}

function renderSignForm(){
  console.log('creer an account');

  $('#create-account').on('click', function(e){
    e.preventDefault();
    console.log('cela marche create account? ');
    $('.sign-up').show();
    console.log('cela marche create account? part deux');

      function renderSignFormTwo(){
        console.log("est-ce que cela marche?");
          $('#signup-submit').on('click', function(e){
              e.preventDefault();
              console.log("oui ou non");
              $('#login').show();
          });
      }
    });

}
>>>>>>> Toggling between already have an account, login and displaying logged in information functions.

// function setCreateUserHandler(){
//   $('form.sign-up').submit(function(e){


// <div class="logged-out" id = "sign-up-div" width="100">
//   <form class="sign-up" action="api/users" method="post">
//     <h3>Sign Up</h3>
//     <input type="text" id = "signup-username" name="user[username]" placeholder = "username">
//     <input type="password" id = "signup-password" name="user[password]" placeholder = "password">
//     <input type="text" id = "signup-email" name="user[email]" value="" placeholder = "email">
//     <input type="text" id = "signup-college" name="user[college]" value="" placeholder = "college">
//     <input id="signup-submit" type="submit" name="name" value="Sign-Up">
//   </form>
//   <button type="button" id = "already-user" name="button">Already Have an Account?</button>
// </div>
