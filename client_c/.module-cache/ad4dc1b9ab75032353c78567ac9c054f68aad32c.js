var AppContainer = require('./FcContainer.js');
var $ = require('jquery');

$(document).ready(function() {
  React.render(
    React.createElement(AppContainer, null),
    document.getElementById('reactContainer')
  );
});
