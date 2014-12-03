var React = require('react');
var _     = require('lodash');
path      = require('path');

var FileTree = React.createClass({
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
          <li key={file.path} draggable="true" className="fileName">{fileName}</li>
        );
      }

      else if (file.kind === 'directory') {
        var subTree = buildNodeTree(file.contents);
        var fileName = path.basename(file.path)
        return (
          <li key={file.path} draggable="true">
            <span className="folderName">{fileName}</span>
            {subTree}
          </li>
        );
      }

    });

    return (
      <ul className="fileTree">
        {tree}
      </ul>
    );

  },
  render: function() {
    return this.buildNodeTree(this.props.files);
  }
});

module.exports = FileTree;
