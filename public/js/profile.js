
function getUsersTextbooks(){
  var userId = $.cookie('user-id');
  $.ajax({
    method: 'get',
    url: '/api/books?user=' + $.cookie('user-id'),
    success: function(data){
      renderCurrentUser(data)
    }
  })
}

function renderCurrentUser(data){
  var data = data.user_id;
  $('#hello-user').text("Hello " + $.cookie('username')+ "!");
  $('#college').text("Currently Attending: " + $.cookie('college'));
  $('#email').text('Email: '+ $.cookie('email'));
  for (var i = 0; i < data.length; i++) {
    var textbook = data[i];
    var eachBook = $('<div id = "each-book">');
    var title = $('<h5 id = "text-title">').text(textbook.title);
    var author = $('<p id = "text-author">').text('By: ' + textbook.author);
    var isbn = $('<p id = "text-isbn">').text('ISBN Code: ' + textbook.isbn);
    var condition = $('<p id = "text-condition">').text('Condition: ' + textbook.condition)
    var image = $('<img id = "text-image">').attr('src', textbook.image);
    eachBook.append(title, author, isbn, condition, image);
    if(textbook.status === 0){
      var sellingBookDiv = $('#books-for-sale');
      var button =  $('<a data-id='+textbook._id+' id = "sell-book-link">').text('Sold Book');
      eachBook.append(button);
      sellingBookDiv.append(eachBook);
    } else if(textbook.status === 1) {
      var soldBookDiv = $('#sold-books');
      soldBookDiv.append(eachBook);
    }
  }
}


function markTextbookAsSold(textbookId, textbookStatus){
  console.log('status: ', textbookStatus);
  console.log('id: ', textbookId);
  $.ajax({
    method: 'put',
    url: '/api/books/' + textbookId,
    data: textbookStatus,
    success: function(data){
      console.log('after marked: ', data);
      // callback(data);
      renderCurrentUser(data);
    }
  })
}

function setSellTextbookHandler(){
  $('body').on('click', '#sell-book-link', function(){

    var textbookStatus = {status: 1};
    // console.log('status: ', textbookStatus);

    var textbookId = this.dataset.id;
    // console.log(textbookId);

    markTextbookAsSold(textbookId, textbookStatus)
  })
}

$(function(){
  getUsersTextbooks();
  setSellTextbookHandler();
})
