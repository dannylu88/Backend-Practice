var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var logger = function(request, response, next){
 console.log('logging...');
 next();
};

app.use(logger);

app.get('/', function(request, response){
  response.send('hello world');
});


app.listen(3000, function(){
 console.log('Server started on port 3000...');
});