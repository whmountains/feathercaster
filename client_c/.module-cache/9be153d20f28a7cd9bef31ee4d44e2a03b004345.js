var React = require('react');
var _     = require('lodash');
path      = require('path');

module.exports = React.createClass({displayName: 'exports',
  propTypes: function() {
    files: React.propTypes.arrayOf(React.propTypes.shape({
      kind: React.propTypes.string,
      path: react.propTypes.string
    })).isRequired();
  },
  buildNodeTree: function(objectTree) {

    var tree = _.map(this.props.files, function(file) {

      fileName = path.basename(file.path);

      if (file.kind === 'audio') {
        return(
          React.createElement("li", null, fileName)
        );
      }

      else if (file.kind === 'directory') {
        var subTree = this.buildNodeTree(file.contents);
        return (
          React.createElement("li", null, fileName, subTree)
        );
      }

    });

    return (
      React.createElement("ul", {className: "fileTree"},
        tree
      )
    );

  },
  render: function() {
    return this.buildNodeTree(this.props.files);
  }
});
