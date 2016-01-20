// console.log("books scripts loaded");
//
//
// function renderHandlebars(data) {
//   var source = $('#textbook-template').html();
//   var template = Handlebars.compile(source);
//
//   var $resultsPlaceholder = $('#rendered-textbooks');
//   $resultsPlaceholder.html(template(data));
//   console.log(data);
// }
//
// function getData(){
//   var query = $('#textbook-input').val();
//   console.log("this is your query: "+ query);
//
//   $.ajax({
//     url: "api/users?college=" + $.cookie('college'),
//     method: 'get',
//     success: function(data){
//       renderHandlebars(data);
//     }
//   });
// }
//
//
// $(function () {
//
//   getData();
//
// });
