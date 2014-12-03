var React = require('react');
var _ = require('lodash');

var AddRow = require('FcPlaylistTableAddRow');

var FcPlaylistTable = React.createClass({
 render: function {

  var addRow = <AddRow headers = >;

  var rows = [addRow];

  _.each(this.props.playlist) {
    rows.push(
      <tr className="playlistRow">
        <td>
    )
  }

   return (
     <table class="pure-table pure-table-horizontal">
      <thead>
        <th id="check">✓</th>
        <th id="start">Start</th>
        <th id="name">Name</th>
        <th id="action">Action</th>
        <th id="duration">Duration</th>
        <th id="end">End</th>
      </thead>
     </table>
   );

 }
});

module.exports = FcPlaylistTable;
