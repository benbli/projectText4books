console.log('loaddddddddddd');

function getOneTextbook(){
  var textbookId = window.location.hash.replace(/#/,'');
  $.ajax({
    method: 'get',
    url: '/api/books/' + textbookId,
    success: function(data){
      console.log(data);
    }
  })
}

$(function(){

  $('body').on('click', '.listed-books', function() {
    console.log('click?');
    getOneTextbook();
  })

})
