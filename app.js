var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//serve all files in __dirname/public
app.use(express.static(path.join(__dirname, 'public')));

var listenPort = process.argv[2] || process.env.PORT || 3000;
http.listen(listenPort, function(){
  console.log('listening on *:' + listenPort);
});
