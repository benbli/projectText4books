<<<<<<< HEAD
console.log("landing");

$(function(){
  $('.sign-up').hide();
  $('#login').hide();
  renderLogForm();
  renderSignForm();
  // renderSignFormTwo();
});

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
=======
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
//
//
// $('.sign-up').on('click', '#already-user', function(){
//   console.log('cela marche? ');
//   $('.sign-up').show();
//   console.log('cela marche? 2');
//   $('#login').hide();
// });
>>>>>>> 2d1c50db3a838c04bc6d8c6be6f8603a4bba05c6
