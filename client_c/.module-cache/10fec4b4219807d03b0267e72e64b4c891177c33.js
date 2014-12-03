var React = require('react');
var _     = require('lodash');

var FcPlaylistsTableHeader = React.createClass({displayName: 'FcPlaylistsTableHeader',
  propTypes: {
    playlistNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  handleChange: function() {
    this.props.onChange(this.refs.chooser.getDOMNode().value);
  },
  render: function() {

    var options = _.map(this.props.playlistNames, function(playlistName) {
      return (
        React.createElement("option", {value: playlistName, key: playlistName}, playlistName)
      );
    });

    var style = {width: "100%", height: "25px", backgroundColor: "#bcbcbc"}

    return (
      React.createElement("div", {className: "FcPlaylistsTableHeader"}, 
        React.createElement("select", {className: "FcPlaylistChooser", ref: "chooser", onChange: this.handleChange}, 
          options
        )
      )
    );
  }

});

module.exports = FcPlaylistsTableHeader;
