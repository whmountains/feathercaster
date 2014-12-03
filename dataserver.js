//TODO: make jshint stricter

var path = require('path');
var async = require('async');
var fs = require('fs');
var d = require('debug')('dataserver');

module.exports = function(http) {

  d('starting dataserver')

  var io = require('socket.io')(http);
  var mapDir = require('./dirScanner.js');

  //put everything into the cache
  var dataCache = {
    messages: [],
    files: [],
    playlists: {}
  };
  async.parallel([

    //load the messages
    function(cb) {
      readData('messages.json', function(err, data) {
        dataCache.messages = data || [];
        d('read messages:', data);
        cb(null);
      });
    },

    //load the files tree
    function(cb) {
      readData('files.json', function(err, data) {
        dataCache.files = data || [];
        d('read files:', data);
        cb(null);
      });
    },

    //scan the playlists directory for playlists and load each each one
    function(cb) {

      fs.readdir(path.join(__dirname, 'data/playlists'), function(err, files) {

        async.each(files, function(plName, callback) {

          readData(path.join('playlists', plName), function(err, data) {
            dataCache.playlists[plName] = data || {};
          });

        }, function() {

          d('read playlists:', dataCache.playlists);
          cb(null);

        });

      });

    }

  ]);

  if (process.argv[2] === 'rescan') {
    scanMusicDir();
  }

  //emit all needed data on first connection
  io.on('connection', function(client) {
    d('a client connected');
    io.emit('data-messages', dataCache.messages);
    io.emit('data-files', dataCache.files);
    io.emit('data-playlists', dataCache.playlists);
  });

  io.on('change-messages', function(messages) {
    dataCache.messages = messages || [];
    changeData('messages');
  });
  io.on('change-files', function(files) {
    dataCache.files = files || [];
    changeData('files');
  });
  io.on('change-playlists', function(playlists) {
    dataCache.playlists = playlists || {};
    changeData('playlists');
  });

  io.on('rescanMusicDir', scanMusicDir);

  function scanMusicDir() {
    mapDir(path.join(__dirname, 'music'), function(err, filesTree) {

      if (err) {
        dataCache.messages.push(err);
        changeData('messages');
        return;
      }

      dataCache.files = filesTree;
      changeData('files');

    });
  }

  function changeData(dataName) {
debugger;
    d('changeData: %s', dataName);

    saveData(dataName + '.json', dataCache[dataName]);
    io.emit('data-' + dataName, dataCache[dataName]);

    //additionally log any messages to the console
    if ((dataName === 'messages') && (dataCache.messages !== [])) {
      d(
        'messages array changed:' +
        dataCache.messages[dataCache.messages.length - 1]
      );
    }

  }

  function readData(fileName, callback, noHandleErrors) {
    fs.readFile(path.join(__dirname, 'data', fileName), {encoding: 'utf8'}, function(err, data) {

      //handle errors ourselves if we aren't told explicitly not to
      if (err && (!noHandleErrors)) {
        //don't save this message to disk to prevent infinite loops of errors
        dataCache.messages.push(err);
      }

      if (!err) {
        data = JSON.parse(data);
      }

      callback(err, data);

    });
  }

  function saveData(fileName, data, callback, noHandleErrors) {

    var dataString = JSON.stringify(data, null, 2);

    fs.writeFile(path.join(__dirname, 'data', fileName), dataString, function(err) {

      //handle errors ourselves if we aren't told explicitly not to
      if (err && (!noHandleErrors)) {
        //don't save this message to disk to prevent infinite loops of errors
        dataCache.messages.push(err);
      }

      //call the callback if it exists
      if (typeof callback === 'function') {
        callback(err);
      }

    });

  }

};
