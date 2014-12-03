var React = require('react');
var _     = require('lodash');

var FcPlaylistsTableHeader = React.createClass({
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
        <option value={playlistName} key={playlistName}>{playlistName}</option>
      );
    });

    var style = {width: "100%", height: "25px", backgroundColor: "#bcbcbc"}

    return (
      <div className="FcPlaylistsTableHeader" style={style}>
        <select className="FcPlaylistChooser" ref="chooser" onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }

});

module.exports = FcPlaylistsTableHeader;
