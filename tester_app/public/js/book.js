

function getBookApi() {
  var query = $('input[name="textbook"]').val();
  console.log('this is your search query: ' + query);

  $.ajax({
    crossDomain: true,
    dataType: "jsonp",
    url:  "https://openlibrary.org/api/books?bibkeys=ISBN:0201558025&format=json",
    method: "get",
    success: function (data) {
      renderHandlebars(data);
    }
  });
}

function renderHandlebars(data) {
  var source = $('#book-template').html();
  var template = Handlebars.compile(source);

  var $resultsPlaceholder = $('#rendered-textbooks');
  $resultsPlaceholder.html(template(data));
  // console.log(data);
}


$(function () {

  $("#submit").click(function(){
    getBookApi();
  });
renderHandlebars();

});
