

function getBookApi() {
  var query = $('input[name="textbook"]').val();
  var apiKey = "ZWOQIN7L";
  console.log('this is your search query: ' + query);

  $.ajax({
    method: "GET",
    crossDomain: true,
    url: "http://isbndb.com/api/v2/json/ZWOQIN7L/book/" + query,
    dataType: "jsonp",
    jsonp: false,
    success: function (data) {
      alert(data);
    }
  });
}

function renderTextBookHandlebars(textbooks) {
  var source = $('#book-template').html;
  var template = Handlebars.compile(source);

  var $resultsPlaceholder = $('#rendered-textbooks');
  $resultsPlaceholder.html(template(textbooks));
  console.log(textbooks);
}




$(function () {

  $("#submit").click(function(){
    getBookApi();
  });

});
