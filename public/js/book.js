console.log('loaddddddddddd');


function getOneTextbook(id){
  $.ajax({
    method: 'get',
    url: '/api/books/' + id,
    success: function(data){
      console.log(data);
    }
  })
};

function clickListener(){

  $('body').on('click', '.listed-books', function() {
    console.log('click');
    getOneTextbook(this.dataset.id);
  });
  
}



$(function(){

  clickListener();

})
