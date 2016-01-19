
// Create users:
function createUser(userData, callback){
  $.ajax({
    method: 'post',
    url: '/api/users',
    data: {user: userData},
    success: function(data){
      console.log('success create user: ', data); // data.user is undefined...
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
      console.log("User : ", user);
      $('#login-div').show();
      $('#sign-up-div').hide();
      updateView();
    });
  });
}

// Login Functions:
function login(username, password, callback) {
  callback = callback || function(){};
  console.log(username, password);
  $.ajax({
    method: 'post',
    url: '/api/users/authenticate',
    data: {
      username: username,
      password: password
    },
    success: function(data){
      $.cookie('token', data.token);
      $.cookie('user-id', data.id);
      console.log('data: ', data);
      $.cookie('username', data.username);
      $.cookie('college', data.college);
      var userId = data.id;
      setUserLoginView();
    }
  });
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
    });
  });
}

function setLogoutFormHandler(){
  $('#logout').click(function(){
    $.removeCookie('token');
    $.removeCookie('user-id');
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

function setTextbookUserId(userId){
  $('input[name="textbook-user-id"]').val('test');
};

function setTextbookFormHandler(textbookData, data, callback){
  $('body').on('submit', 'form#submit-book-form', function(e){
    e.preventDefault();

    var titleText = $('#book-title').text();
    var isbnText = $('#book-isbn').text();
    var authorText = $('#book-author').text();
    var imageText = $('#book-image').attr('src');
    var descriptionText = $('#book-description').text();

    var conditionField = $('#condition');
    var conditionText = conditionField.val();
    conditionField.val('');

    var professorField = $('#professor');
    var professorText = professorField.val();
    professorField.val('');

    var userId = $('#submit-user-id').val();

    textbookData = {
      title: titleText,
      isbn: isbnText,
      author: authorText,
      image: imageText,
      description: descriptionText,
      condition: conditionText,
      professor: professorText
    };

    console.log(textbookData);

    $('#modal-view').hide();
    $('body').css({
      background: 'red'
    })


    createTextbook(userId, textbookData, function(textbook){
      updateView();
    })
  })
}

function createTextbook(userId, textbookData, callback){
  callback = callback || function(){};
  // console.log();
  $.ajax({
    method: 'post',
    url: '/api/users/' + userId + '/textbooks',
    data: {textbook: textbookData},
    success: function(data){
      console.log(userId);
      var textbook = data.textbook;
      callback(textbook);
      console.log(textbook);
    }
  })
}

// Google Books API Search
function searchGoogleAPI(){
  var bookSearch = $('#isbn').val();
  $.ajax({
    method: 'get',
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + bookSearch,
    success: function(data){
      renderApiSearch(data);
    }
  })
}

function setApiSearchHandler(){
  $('#isbn-submit').click(function(e){
    e.preventDefault();

    console.log('search!!!');
    searchGoogleAPI();
  })
}

function renderApiSearch(data){
  var modalBody = $('#search-results');
  modalBody.append($('<h2 id = "book-title">').text(data.items[0].volumeInfo.title));
  modalBody.append($('<h5 id = "book-isbn">').text('ISBN: ' + data.items[0].volumeInfo.industryIdentifiers[1].identifier));
  modalBody.append($('<img id = "book-image">').attr('src', data.items[0].volumeInfo.imageLinks.smallThumbnail));
  for (var i = 0; i < data.items[0].volumeInfo.authors.length; i++) {
    var author = data.items[0].volumeInfo.authors[i];
    modalBody.append($('<h4 id = "book-author">').text(author));
  };
  modalBody.append($('<p id = "book-description">').append(data.items[0].volumeInfo.description));
  renderBookInputs();
}

function renderBookInputs(){
  var form = $('<form id = "submit-book-form">')
  form.append($('<input type = text id = "condition" placeholder = "Book Condition">'));
  form.append($('<input type = text id = "professor" placeholder = "Professors name">'));
  form.append($('<input type = text id = "submit-user-id">').val($.cookie('user-id')));
  form.append($('<input type = "submit" id = "submit-book" value = "Sell Book">'));
  $('#search-results').append(form);
}

// Render Page:
function getAllTextbooks(callback){
  $.ajax({
    url: '/api/users/' + userId + '/textbooks',
    success: function(data){
      var textbooks = data.textbooks || [];
      callback(textbooks);
      console.log("textbooks: ", textbooks);
    }
  })
}

function getAllUsers(callback){
  $.ajax({
    url: '/api/users',
    success: function(data){
      var users = data.users || [];
      callback(users);
      // console.log("users: " + users);
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


function setUserLoginView(){
  if($.cookie('token')){
    console.log('cookie is present!');
    $('.user-only').show();
    $('.logged-out').hide();
  } else {
    console.log("no cookies!");
    $('.user-only').hide();
    $('.logged-out').show();
  }
};


function showModal(){
  $('#start-modal').click(function(){
     console.log('clicked');
     $('#modal-view').toggle();
     $('body').css({
       background: 'rgb(125, 34, 34)'
     })
  });
}

function hideModal(){
  $('#exit-modal').click(function(){
    $('#modal-view').hide();
    $('body').css({
      background: 'red'
    })
  })
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
});
