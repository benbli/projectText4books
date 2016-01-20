console.log('loaddddddddddd');

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

$(function(){

  $('body').on('click', '.listed-books', function() {
    console.log('click?');
    getOneTextbook();
  })

})
