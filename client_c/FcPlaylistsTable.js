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
    var plNames = _.keys(this.props.playlists);
    return (
      React.createElement(FcPlaylistsTableHeader, {onChange: this.changePlaylist, playlistNames: plNames})
    );
  }
});

function getFirstKey(object) {
  return _.findKey(object, function(){return true})
}

module.exports = FcPlaylistsTable;
