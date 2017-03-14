var express = require('express');
var app = express();
var http = require('http').Server(app);

// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});