var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

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

//Set Static path for public folder, like css file, jQuery
//also I created a public folder, that's where I want to put some client stuff inside
     //commented out for now because I want to play on the backend, not front end yet
// app.use(express.static(path.join(__dirname,'public')))




app.get('/', function(request, response){
  response.render('index');
});


app.listen(3000, function(){
 console.log('Server started on port 3000...');
});