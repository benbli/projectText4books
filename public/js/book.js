
function getOneTextbook(id){
  $.ajax({
    method: 'get',
    url: '/api/books/' + id,
    success: function(data){
    }
  })
};

function clickListener(){

  $('body').on('click', '.listed-books', function() {
    getOneTextbook(this.dataset.id);
  });

}


$(function(){

  clickListener();

})
