var React = require('react');
var _     = require('lodash');

var FcPlaylistsTableHeader = require('./FcPlaylistsTableHeader.js');

var FcPlaylistsTable = React.createClass({displayName: 'FcPlaylistsTable',
  getInitialState: function() {
    return {
      currentPlaylist: getFirstKey(this.props.playlists)
    }
  },
  changePlaylist: function(playlistName) {
    this.setState({currentPlaylist: playlistName});
  },
  render: function() {
    var playlistNames = _.keys(this.props.playlists);
    return (
      React.createElement(FcPlaylistsTableHeader, {changePlaylist: this.changePlaylist})
    );
  }
});

function getFirstKey(object) {
  return _.findKey(object, function(){return true})
}

module.exports = FcPlaylistsTable;
