function renderCommentForm(haiku){
  var $commentForm = $('<form>').addClass('comment-generator');
  $commentForm.append( $('<input type="hidden" name="haiku-id">').val(haiku._id) );
  // $commentForm.append( $('<input type="text" name="username">') );
  $commentForm.append( $('<input type="text" name="body">') );
  $commentForm.append( $('<input type="submit">') );
  return $commentForm;
}


function renderTextbookForm(textbook) {
  var $textbookForm = $('<form>').addClass('textbook-generator');
  $textbookForm.append( $('<input type="hidden" name="haiku-id"').val(textbook._id) );

}
