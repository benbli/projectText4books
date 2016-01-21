console.log('profiless');

function getCurrentUser(){
  var userId = $.cookie('user-id');
  $.ajax({
    method: 'get',
    url: '/api/users/' + userId,
    success: function(data){
      console.log(data);
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
      var button =  $('<a href=#'+textbook._id+' id = "sell-book-link">').text('Sold Book');
      eachBook.append(button);
      sellingBookDiv.append(eachBook);
    } else if(textbook.status === 1) {
      var soldBookDiv = $('#sold-books');
      soldBookDiv.append(eachBook);
    }
  }
}

function getOneTextbook(){
  var textbookId = window.location.hash.replace(/#/,'');
  $.ajax({
    method: 'get',
    url: '/api/book/' + textbookId,
    success: function(data){
      console.log(data);
    }
  })
}

function markTextbookAsSold(textbookStatus, callback){
  var textbookId = window.location.hash.replace(/#/,'');
  console.log('textbookId: ' + textbookId);
  $.ajax({
    method: 'patch',
    url: '/api/book/' + textbookId,
    data: textbookStatus,
    success: function(data){
      callback(data)
    }
  })
}

function setSellTextbookHandler(){
  $('body').on('click', '#sell-book-link', function(){

    var textbookStatus = {status: 1};
    console.log('status: '+textbookStatus.status);

    markTextbookAsSold(textbookStatus, function(textbook){
      console.log(textbook);
    })
  })
}

$(function(){
  getCurrentUser();
  setSellTextbookHandler();
})
