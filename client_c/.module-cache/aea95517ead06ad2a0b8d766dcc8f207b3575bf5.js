var React = require('react');
var socket = require('socket.io-client');
var io = socket();


Header = require('./Header.js');
FcPlaylistsTable = require('./FcPlaylistsTable.js');
FileTree = require('./FileTree.js');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {
      messages: [],
      files: [],
      playlists: {}
    };
  },
  componentWillMount: function() {
    var self = this

    io.on('data-messages', function(messages) {
      self.setState({messages: messages});
    });

    io.on('data-files', function(files) {
      self.setState({files: files});
    });

    io.on('data-playlists', function(playlists) {
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
