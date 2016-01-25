
function getOneTextbook(id){
  $.ajax({
    method: 'get',
    url: '/api/books/' + id,
    success: function(data){
      console.log(data);
      var textbook = data;
      renderTextbook(textbook);
    }
  })
};

function viewBookListener(){
  $('body').on('click', '#view-book', function() {
    console.log('click');
    getOneTextbook(this.dataset.id);
  });
}

function renderTextbook(textbook) {
  $('#show-book-title').text('test');
}


$(function(){

  viewBookListener();

})
