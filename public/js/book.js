console.log('loaddddddddddd');

function getOneTextbook(){
  var textbookId;
  $.ajax({
    method: 'get',
    url: '/api/book/' + textbookId,
    success: function(data){
      console.log(data);
    }
  })
}
