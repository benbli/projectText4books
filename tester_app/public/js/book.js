console.log("books scripts loaded");


function renderHandlebars(data) {
  var source = $('#textbook-template').html();
  var template = Handlebars.compile(source);

  var $resultsPlaceholder = $('#rendered-textbooks');
  $resultsPlaceholder.html(template(data));
  console.log(data);
}

function getData(){

// HELP. My AJAX call to the iTunes API doesn't seem to work, please fix it!
var query = $('#textbook-input').val();
console.log("this is your query: "+ query);

  $.ajax({
    url: "api/users",
    method: 'get',
    success: function(data){
      renderHandlebars(data);
    }
  });
}

$(function () {

  getData();

  $("#submit").click(function(){
  });
// renderHandlebars();

});
