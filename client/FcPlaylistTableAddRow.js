var React = require('react');

var FcPlaylistTableAddRow = React.createClass({
  handleTrigger: function(element) {
    this.props.onTrigger();
  }
  render: function() {
    var headers = String(this.props.headers);
    return (
      <tr className="addRow" onClick={this.handleTrigger}>
        <td headers={headers}>+</td>
      </tr>
    );
  }
})
