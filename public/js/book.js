
function getOneTextbook(textbookId){
  var textbookId = sessionStorage.getItem("textbookId");
  $.ajax({
    method: 'get',
    url: '/api/books/' + textbookId,
    success: function(data){
      console.log(data);
      var textbook = data;
      renderTextbook(textbook);
    }
  })
};


function renderTextbook(textbook) {
  $('#show-book-title').text(textbook.title);
  $('#show-book-author').text("By: "+textbook.author);
  $('#show-book-price').text('Asking $'+textbook.price);
  $('#show-book-image').attr('src', textbook.image);
  $('#show-book-description').text(textbook.description);
  $('#show-book-condition').text('Condition: ' + textbook.condition);
  $('#show-book-professor').text('Taught by: ' + textbook.professor);
  $('#show-book-isbn').text('ISBN: ' + textbook.isbn);
  if(textbook.user_id != $.cookie('user-id')){
    $('#show-textbook').append($('<a class="modal-trigger waves-effect waves-light btn" href="#make-offer">').text('Make Offer'));
    $('.modal-trigger').leanModal();
  } else {
    $('#show-textbook').append($('<button id = "your-textbook" class = "btn" disabled>').text("Make Offer"));
  }
}


$(function(){

  getOneTextbook();
  $("#start-modal").remove();

})
