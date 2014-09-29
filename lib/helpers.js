_.mixin({
  "id": function(hexString) {
    return Meteor
           .npmRequire('mongoskin')
           .ObjectID
           .createFromHexString(hexString);
  }
});
