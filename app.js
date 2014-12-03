var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

//serve all files in ./public
app.use(express.static(path.join(__dirname, 'public')));

//start the data server
require('./dataserver.js')(http);

var listenPort = process.env.PORT || 3000;
http.listen(listenPort, function(){
  console.log('listening on *:' + listenPort);
});
