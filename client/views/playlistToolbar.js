initPlaylistToolbar = function(paneRef) {

  //list the id's for each toolbar element
  var tbIDs = {
    'plistChoose': 1
  };

  // create a blank toolbar
  toolBarRef = paneRef.attachToolbar();

  //add an item to the toolbar
  toolBarRef.addButtonSelect(
    tbIDs.plistChoose, 0,
    'Change Playlist', [],
    null, null,
    'disabled', true
  );

  //subscribe to the playlists collection
  Meteor.subscribe('playlists', function() {
    
    //clear the elements from the dropdown list and replace them with the
    //new list of playlists everytime that list changes
    Tracker.autorun(function(){

      var originalOptions = toolBarRef.getAllListOptions(tbIDs);
      _.each(originalOptions, function(option){
        console.dir(option);
        //remove the item
      });

      // get the list of playlists from the db
      var playlistsList = playlistsCollection.find({}, {name: 1}).fetch();
      _.each(playlistsList, function(playlist, position){
        //convert the id to a string
        var playlistID = playlist._id.toString();
        //add the playlist to the list
        toolBarRef.addListOption(tbIDs.plistChoose, position, position, 'button', playlist.name);
      });
    });
  });
};
