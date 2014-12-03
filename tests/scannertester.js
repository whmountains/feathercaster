var getDirTree = require('./dirScanner.js');
var util = require('util');
var path = require('path');

getDirTree(path.join(__dirname, 'music'), function(err, tree) {
  console.log(util.inspect(tree, {
    depth: null,
    colors: true
  }));
});
