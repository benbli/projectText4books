console.log('profiless');

function getCurrentUser(){
  var userId = $.cookie('user-id');
  $.ajax({
    method: 'get',
    url: '/api/users/' + userId,
    success: function(data){
      renderCurrentUser(data);
    }
  })
}

function renderCurrentUser(data){
  var data = data.users;
  $('#hello-user').text("Hello " + data.username + "!");
  $('#college').text("Currently Attending: " + data.college);
  $('#email').text('Email: '+ data.email);
  for (var i = 0; i < data.textbooks.length; i++) {
    var textbook = data.textbooks[i];
    var eachBook = $('<div id = "each-book">');
    var title = $('<h2 id = "text-title">').text(textbook.title);
    var author = $('<h4 id = "text-author">').text('By: ' + textbook.author);
    var isbn = $('<h4 id = "text-isbn">').text('ISBN Code: ' + textbook.isbn);
    var condition = $('<h4 id = "text-condition">').text('Condition: ' + textbook.condition)
    var image = $('<img id = "text-image">').attr('src', textbook.image);
    eachBook.append(title, author, isbn, condition, image);
    if(textbook.status === 0){
      var sellingBookDiv = $('#books-for-sale');
      sellingBookDiv.append(eachBook);
    } else if(textbook.status === 1) {
      var soldBookDiv = $('#sold-books');
      soldBookDiv.append(eachBook);
    }
  }
}

$(function(){
  getCurrentUser();
})
