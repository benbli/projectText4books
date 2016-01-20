console.log("landing");

$(function(){
  $('.sign-up').hide();
  $('#login').hide();

});


document.getElementById('already-user').addEventListener("click", renderSignForm);

function renderSignForm(){
  document.getElementsByClassName('sign-up').show();
}




// $('.sign-up').on('click', '#already-user', function(){
//   console.log('cela marche? ');
//   $('.sign-up').show();
//   console.log('cela marche? 2');
//   $('#login').hide();
// });
