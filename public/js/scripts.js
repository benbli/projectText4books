
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
      console.log('data: ', data);
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
      user_id: userId
    };

    console.log(textbookData);

    $('#modal-view').hide();
    // $('body').css({
      // background: 'white'
    // })


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
    url: '/api/books',
    data: textbookData,
    success: function(textbook){
      setUserLoginView();
      console.log(userId);
      console.log(textbook);
      callback(textbook);
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
  modalBody.append($('<h5 id = "book-isbn">').text(data.items[0].volumeInfo.industryIdentifiers[1].identifier));
  modalBody.append($('<img id = "book-image">').attr('src', data.items[0].volumeInfo.imageLinks.smallThumbnail));
  if(data.items[0].volumeInfo.authors != undefined){
    for (var i = 0; i < data.items[0].volumeInfo.authors.length; i++) {
      var author = data.items[0].volumeInfo.authors[i];
      modalBody.append($('<h4 id = "book-author">').text(author));
    };
  }
  modalBody.append($('<p id = "book-description">').append(data.items[0].volumeInfo.description));
  renderBookInputs();
}

function renderBookInputs(){
  var form = $('<form id = "submit-book-form">');
  // form.append($('<div class="input-field"> <select id = "book-condition"> <option value="" disabled selected>Choose Book Condition</option> <option value="new">New</option> <option value="like-new">Like New</option> <option value="Used">Used</option> </select> <label> Select</label> </div></br>'));
  form.append($('<input type = "text" id = "book-condition" placeholder = "Book Condition">'));
  form.append($('<input type = text id = "professor" placeholder = "Professors name">'));
  form.append($('<input type="number" id = "price" min="0.01" step="0.01" max="300" value="25.67" placeholder = "Price"/>'));
  form.append($('<input type = hidden id = "submit-user-id">').val($.cookie('user-id')));
  form.append($('<input type = hidden id = "submit-textbook-college">').val($.cookie('college')));
  form.append($('<input type = "submit" id = "submit-book" value = "Sell Book">'));
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
    getData();
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
      //  background: 'rgb(180, 180, 180)'
     })
  });
}

function hideModal(){
  $('#exit-modal').click(function(){
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
  console.log(data.textbooks);
}

function getData(){
  var query = $('#textbook-input').val();
  console.log("this is your query: "+ query);

  $.ajax({
    url: "api/books?college=" + $.cookie('college') + '&status=0',
    method: 'get',
    success: function(data){
      renderHandlebars(data);
    }
  });
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
