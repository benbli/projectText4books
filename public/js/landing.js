console.log("landing");

$(function(){
  // $('.sign-up').hide();
  // $('#login').hide();
  $('.sign-up').hide();
  $('#login').hide();
  renderLogForm();
  // renderSignForm();
  // renderSignFormTwo();
});

// this works
function renderLogForm(){
  $('#already-user').on('click', function(e){
    e.preventDefault();
    $('#login').show();
  });
}
function renderSignForm(){
  console.log('creer an account');
  $('#create-account').on('click', function(e){
    e.preventDefault();
    console.log('cela marche create account? ');
    $('.sign-up').show();
    console.log('cela marche create account? part deux');

// this works
function renderLogForm(){
  $('#already-user').on('click', function(e){
    e.preventDefault();
    $('#login').show();
  });
}
// function renderSignForm(){
//   console.log('creer an account');
//   $('#create-account').on('click', function(e){
//     e.preventDefault();
//     console.log('cela marche create account? ');
//     $('.sign-up').show();
//     console.log('cela marche create account? part deux');
//
//       function renderSignFormTwo(){
//         console.log("est-ce que cela marche?");
//           $('#signup-submit').on('click', function(e){
//               e.preventDefault();
//               console.log("oui ou non");
//               $('#login').show();
//           });
//       }
//     });
// }
