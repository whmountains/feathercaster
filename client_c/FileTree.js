var React = require('react');
var _     = require('lodash');
path      = require('path');

var FileTree = React.createClass({displayName: 'FileTree',
  propTypes: function() {
    files: React.propTypes.arrayOf(React.propTypes.shape({
      kind: React.propTypes.string.isRequired(),
      path: react.propTypes.string.isRequired()
    })).isRequired();
  },
  buildNodeTree: function(objectTree) {

    var buildNodeTree = this.buildNodeTree;

    var tree = _.map(objectTree, function(file) {

      fileName = path.basename(file.path);

      if (file.kind === 'audio') {
        return(
          React.createElement("li", {key: file.path, draggable: "true", className: "fileName"}, fileName)
        );
      }

      else if (file.kind === 'directory') {
        var subTree = buildNodeTree(file.contents);
        var fileName = path.basename(file.path)
        return (
          React.createElement("li", {key: file.path, draggable: "true"}, 
            React.createElement("span", {className: "folderName"}, fileName), 
            subTree
          )
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

module.exports = FileTree;
