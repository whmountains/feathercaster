var React = require('react');
var io = require('socket.io-client');
var socket = io();
var $ = require('jquery');


Header = require('./Header.js');
FcPlaylistsTable = require('./FcPlaylistsTable.js');
FileTree = require('./FileTree.js');

var FcContainer = React.createClass({
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
      console.log('setting state: ', {messages: messages})
    });

    socket.on('data-files', function(files) {
      self.setState({files: files});
      console.log('setting state: ', {files: files})
    });

    socket.on('data-playlists', function(playlists) {
      self.setState({playlists: playlists});
      console.log('setting state: ', {playlists: playlists})
    });

    $(window).on('beforeunload', function(){
      socket.close();
    });

  },
  render: function() {
    return (
      <div className="FcContainer">

        <div className="pure-g header">
          <div className="pure-u-1">
            <Header messages={this.state.messages}/>
          </div>
        </div>

        <div className="pure-g body">

          <div className="pure-u-1-3">
            <FileTree files={this.state.files}/>
          </div>

          <div className="pure-u-2-3">
            <FcPlaylistsTable playlists={this.state.playlists} />
          </div>

        </div>

      </div>
    );
  }
});

module.exports = FcContainer;
