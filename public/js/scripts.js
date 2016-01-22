
// Create users:
function createUser(userData, callback){
  $.ajax({
    method: 'post',
    url: '/api/users',
    data: {user: userData},
    success: function(data){
      $('#modal1').closeModal();
      callback(data);
    }
  });
}

function setCreateUserHandler(){
  $('form.sign-up').submit(function(e){
    e.preventDefault();

    var usernameField = $(this).find('input[name="user[username]"]');
    var usernameText = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name="user[password]"]');
    var passwordText = passwordField.val();
    passwordField.val('');

    var emailField = $(this).find('input[name="user[email]"]');
    var emailText = emailField.val();
    emailField.val('');

    var collegeField = $(this).find('input[name="user[college]"]');
    var collegeText = collegeField.val();
    collegeField.val('');

    var userData = {
      username: usernameText,
      password: passwordText,
      email: emailText,
      college: collegeText
    };

    createUser(userData, function(user){
      // $('#login-div').show();
      // $('#sign-up-div').hide();
      updateView();
    });
  });
}

// Login Functions:
function login(username, password, callback) {
  callback = callback || function(){};
  $.ajax({
    method: 'post',
    url: '/api/users/authenticate',
    data: {
      username: username,
      password: password
    },
    success: function(data){
      $('#modal1').closeModal();
      $.cookie('token', data.token);
      $.cookie('user-id', data.id);
      $.cookie('username', data.username);
      $.cookie('college', data.college);
      $.cookie('email', data.email);
      var userId = data.id;
      setUserLoginView();
    }
  });
}

function renderGreeting(){
  $('#greeting').text('Hi ' + $.cookie('username') + '! Here are all the textbooks for sale on the ' + $.cookie('college') + ' campus:');
}

function setLoginFormHandler(){
  $('form#login').submit(function(e){
    e.preventDefault();

    var usernameField = $('#login-username');
    var username = usernameField.val();
    usernameField.val('');

    var passwordField = $('#login-password');
    var password = passwordField.val();
    passwordField.val('');

    login(username, password, function(callback){
      $('#modal1').closeModal();
    });
  });
}

function setLogoutFormHandler(){
  $('#logout').click(function(){
    $.removeCookie('token');
    $.removeCookie('user-id');
    $('#no-books').remove();
    setUserLoginView();
  });
}

function toggleLogin(){
  $('#create-account').click(function(){
    $('#login-div').hide();
    $('#sign-up-div').show();
  });
  $('#already-user').click(function(){
    $('#login-div').show();
    $('#sign-up-div').hide();
  });
}

function setTextbookFormHandler(textbookData, data, callback){
  $('body').on('submit', 'form#submit-book-form', function(e){
    e.preventDefault();

    var titleText = $('#book-title').text();
    var isbnText = $('#book-isbn').text();
    var authorText = $('#book-author').text();
    var imageText = $('#book-image').attr('src');
    var descriptionText = $('#book-description').text();

    var conditionField = $('#book-condition');
    var conditionText = conditionField.val();
    conditionField.val('');

    var professorField = $('#professor');
    var professorText = professorField.val();
    professorField.val('');

    var userId = $('#submit-user-id').val();

    var collegeText = $('#submit-textbook-college').val();

    var price = $("#price").val();

    var email = $('#textbook-email').val();

    textbookData = {
      title: titleText,
      isbn: isbnText,
      author: authorText,
      image: imageText,
      description: descriptionText,
      condition: conditionText,
      professor: professorText,
      college: collegeText,
      price: price,
      email: email,
      user_id: userId
    };

    $('#modal-view').hide();

    createTextbook(userId, textbookData, function(textbook){
      updateView();
    })
  })
}

function createTextbook(userId, textbookData, callback){
  callback = callback || function(){};
  $.ajax({
    method: 'post',
    url: '/api/books',
    data: textbookData,
    success: function(textbook){
      setUserLoginView();
      callback(textbook);
    }
  })
  getUsersTextbooks();
}

// Google Books API Search
function searchGoogleAPI(){
  var bookSearch = $('#isbn').val();
  $.ajax({
    method: 'get',
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + bookSearch,
    success: function(data){
      console.log(data);
      $('#isbn').val('');
      renderApiSearch(data);
    }
  })
}

function setApiSearchHandler(){
  $('#isbn-submit').click(function(e){
    e.preventDefault();

    searchGoogleAPI();
  })
}

function renderApiSearch(data){
  var modalBody = $('#search-results');
  modalBody.append($('<h3 id = "book-title">').text(data.items[0].volumeInfo.title));
  if(data.items[0].volumeInfo.authors != undefined){
    for (var i = 0; i < data.items[0].volumeInfo.authors.length; i++) {
      var author = data.items[0].volumeInfo.authors[i];
      modalBody.append($('<h4 id = "book-author">').text(author));
    };
  };
  modalBody.append($('<h5 id = "book-isbn">').text(data.items[0].volumeInfo.industryIdentifiers[1].identifier));
  modalBody.append($('<img id = "book-image">').attr('src', data.items[0].volumeInfo.imageLinks.smallThumbnail));
  modalBody.append($('<p id = "book-description">').append(data.items[0].volumeInfo.description));
  renderBookInputs();
}

function renderBookInputs(){
  var form = $('<form id = "submit-book-form">');
  // form.append($('<div class="input-field"> <select id = "book-condition"> <option value="" disabled selected>Choose Book Condition</option> <option value="new">New</option> <option value="like-new">Like New</option> <option value="Used">Used</option> </select> <label> Select</label> </div></br>'));
  form.append($('<input type = "text" id = "book-condition" placeholder = "Book Condition" required>'));
  form.append($('<input type = text id = "professor" placeholder = "Professors name" required>'));
  form.append($('<input type="number" id = "price" min="0.01" step="0.01" max="300" placeholder = "Price"/>'));
  form.append($('<input type = "hidden" id = "submit-user-id">').val($.cookie('user-id')));
  form.append($('<input type = "hidden" id = "textbook-email">').val($.cookie('email')));
  form.append($('<input type = "hidden" id = "submit-textbook-college">').val($.cookie('college')));
  form.append($('<input type = "submit" id = "submit-book" class = "btn btn" value = "Sell Book">'));
  $('#search-results').append(form);
}

function getAllUsers(callback){
  $.ajax({
    url: '/api/users' ,
    success: function(data){
      var users = data.users || [];
      callback(users);
    }
  });
}

function renderTextbooks(textbook){
  var source = $("#book-template").html();  // Go find the template
  var template = Handlebars.compile(source); // Create a template function
  var context = {textbooks: textbook};  // What data will i pass the template?
  var textbookElement = template( context ); // Generate HTML
  var $resultsPlaceholder = $('#rendered-textbooks');
  $resultsPlaceholder.html(template(textbook));
  return textbookElement;
}

// function showDescription(){
//   $('body').on('click', '#show-description', function(){
//     $('#show-description').toggle();
//     $('#card-description').toggle();
//   })
//   $('body').on('click', '#hide-description', function(){
//     $('#show-description').toggle();
//     $('#card-description').toggle();
//   })
// }

function renderUsers(usersArray){
  var source = $("#users-template").html();  // Go find the template
  var template = Handlebars.compile(source); // Create a template function
  var context = {users: usersArray};  // What data will i pass the template?
  var usersElement = template( context ); // Generate HTML
  return usersElement;
}

function updateView(){
  getAllUsers(function(textbooks){
    $('section#users').empty();
    var textbookElement = renderTextbooks(textbooks);
    $('section#users').append(textbookElement);
  });
};

function removeGreetingAndBookMessage(){
  $('#greeting').remove();
  $('#no-books').remove();
}


function setUserLoginView(){
  if($.cookie('token')){
    getData();
    renderGreeting();
    $('.user-only').show();
    $('.logged-out').hide();
  } else {
    renderTextbookInfo();
    $('.user-only').hide();
    $('.logged-out').show();
  }
};


function showModal(){
  $('body').on('click', '#start-modal', function(){
     $('#modal-view').toggle();
  });
}

function hideModal(){
  $('#exit-modal').click(function(){
    $('#search-results').remove();
    $('#isbn').val('');
    $('#modal-view').hide();
    $('body').css({
      // background: 'white'
    })
  })
}

function renderHandlebars(data) {
  var source = $('#textbook-template').html();
  var template = Handlebars.compile(source);

  var $resultsPlaceholder = $('#rendered-textbooks');
  $resultsPlaceholder.html('test');
  $resultsPlaceholder.html(template(data));
}

function getData(){
  $.ajax({
    url: "api/books?college=" + $.cookie('college') + '&status=0',
    method: 'get',
    success: function(data){
      if(data.textbooks.length === 0){
        noBooksOnCampus()
      }
      renderHandlebars(data);
    }
  });
}

function noBooksOnCampus(){
  var noBooks = $('#no-books');
  noBooks.text('Uh oh...looks like the ' + $.cookie('college') + 'campus doesn\t have any books for sale at the moment!');
}

function renderTextbookInfo(){
  var random = Math.random();
  if(random < 0.25){
    $('#textbook-info').text('College textbooks prices have risen %1,041 since 1977, let\s put an end to the madness.')
  }
  else if(random < 0.5){
    $('#textbook-info').text('Stop selling back your textbooks to large book-resellers, and sell directly to the student with Text4Books.')
  }
  else if(random < 0.75){
    $('#textbook-info').text('Get cash quick by connecting with fellow students who are right on campus that need your books.')
  }
  else if(random < 1) {
    $('#textbook-info').text('Textbook prices have increased more than tuition, medical services, and new home prices...Let\s put an end to this.')
  }
}

$(function(){
  setLoginFormHandler();
  setLogoutFormHandler();
  setCreateUserHandler();
  setTextbookFormHandler();
  updateView();
  toggleLogin();
  showModal();
  hideModal();
  setUserLoginView();
  setApiSearchHandler();
  // showDescription();
});

$(document).ready(function(){
  $('select').material_select();
})

$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
});
