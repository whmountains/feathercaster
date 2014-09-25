Meteor.publish("events", function () {
    return eventsCollection.find();
});

Meteor.publish("files", function() {
  return filesCollection.find();
});

Meteor.publish("playlists", function() {
  return playlistsCollection.find();
});
