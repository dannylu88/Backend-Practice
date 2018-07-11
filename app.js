var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var expressValidator = require('express-validator')
const { check } = require('express-validator/check');


var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);

var app = express();
/*
var logger = function(request, response, next){
 console.log('logging...');
 next();
};

app.use(logger);
*/

//view Engine (ejs)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


//added json so that will handle json content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//use expressValidator
app.use(expressValidator());

//Global vars

app.use(function(request, response, next){
	//response.locals.something = add global variables
  response.locals.errors = null;
  next();

});

//Set Static path for public folder, like css file, jQuery
//also I created a public folder, that's where I want to put some client stuff inside
     //commented out for now because I want to play on the backend, not front end yet
// app.use(express.static(path.join(__dirname,'public')))

var users = [
  {
  	firstName:'Danny',
  	lastName:'Lu',
  	email:'dannylu8@google.com'
  },
  {
  	firstName:'Travis',
  	lastName:'Hang',
  	email:'travis@google.com'
  }

];

app.get('/', function(request, response){
	db.users.find(function (err, docs) {
     console.log('docs',docs);
     response.render('index',{
  	   title:'customers',
  	   users:docs
    });
  });
  
});

app.post('/users/add', function(request, response){
  console.log('FORM Submitted');
  

  request.checkBody('firstName', 'first name is required').notEmpty();
  request.checkBody('lastName', 'last name is required').notEmpty();


  request.checkBody('email', 'email is required').notEmpty();
  request.checkBody('email', 'email must be an valid e-mail').isEmail();

  var errors = request.validationErrors();

  if(errors){
    response.render('index', {
      title:'customers',
      users:users,
      errors: errors
    });

    console.log('ERRORS');
  }else{
  	var newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email
  	};
    db.users.insert(newUser, function(err, result){
      if(err){
      	console.log(err);
      }
      response.redirect('/');
    });
  	console.log('SUCCESS!!!');
  }

  // var newUser = {
  // 	firstName: request.body.firstName,
  // 	lastName: request.body.lastName,
  // 	email: request.body.email
  // };

  console.log(newUser);
});





app.listen(3000, function(){
 console.log('Server started on port 3000...');
});