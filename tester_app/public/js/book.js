

function getBookApi() {
  var query = $('input[name="textbook"]').val();
  var apiKey = "ZWOQIN7L";
  console.log('this is your search query: ' + query);

  $.ajax({
    crossDomain: true,
    dataType: "json",
    url: "http://isbndb.com/api/v2/json/ZWOQIN7L/book/biology?callback=?",
    method: "GET",
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
