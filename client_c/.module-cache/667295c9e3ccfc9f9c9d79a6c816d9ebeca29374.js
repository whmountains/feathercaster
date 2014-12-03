var React = require('react');
var io = require('socket.io-client');
var socket = io();


Header = require('./Header.js');
FcPlaylistsTable = require('./FcPlaylistsTable.js');
FileTree = require('./FileTree.js');

var FcContainer = module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {
      messages: [],
      files: [],
      playlists: {}
    };
  },
  componentWillMount: function() {
    var self = this

    socket.on('data-messages', function(messages) {
      self.setState({messages: messages});
    });

    socket.on('data-files', function(files) {
      self.setState({files: files});
      console.log('setting state: ', {files: files})
    });

    socket.on('data-playlists', function(playlists) {
      self.setState({playlists: playlists});
    });

  },
  render: function() {
    return (
      React.createElement("div", {className: "FcContainer"}, 

        React.createElement("div", {className: "pure-g header"}, 
          React.createElement("div", {className: "pure-u-1"}, 
            React.createElement(Header, {messages: this.state.messages})
          )
        ), 

        React.createElement("div", {className: "pure-g body"}, 

          React.createElement("div", {className: "pure-u-1-3"}, 
            React.createElement(FileTree, {files: this.state.files})
          ), 

          React.createElement("div", {className: "pure-u-2-3"}, 
            React.createElement(FcPlaylistsTable, {playlists: this.state.playlists})
          )

        )

      )
    );
  }
});
