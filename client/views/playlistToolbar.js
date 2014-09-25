initPlaylistToolbar = function(paneRef) {

  //list the id's for each toolbar element
  ptbIDs = {
    'plistChoose': 1,
    'plistNew': 2
  };

  // create a blank toolbar
  toolBarRef = paneRef.attachToolbar();

  // tell it where to find it's icons
  toolBarRef.setIconsPath("dhx_skins/skyblue/imgs/dhxtoolbar_skyblue");

  //add the playlist chooser to the toolbar
  toolBarRef.addButtonSelect(
    ptbIDs.plistChoose, 0,
    'Change Playlist', [],
    null, null,
    'disabled', true
  );

  //subscribe to the playlists collection
  Meteor.subscribe('playlists', function() {

    //clear the elements from the dropdown list and replace them with the
    //new list of playlists everytime that list changes
    Tracker.autorun(function(){

      var originalOptions = toolBarRef.getAllListOptions(ptbIDs);
      _.each(originalOptions, function(option){
        console.dir(option);
        //remove the item
      });

      // get the list of playlists from the db
      // and send add them as options in the playlist chooser
      var playlistsList = playlistsCollection.find({}, {name: 1}).fetch();
      _.each(playlistsList, function(playlist, position){
        //convert the id to a string
        var playlistID = playlist._id.valueOf();
        //add the playlist to the list
        toolBarRef.addListOption(ptbIDs.plistChoose, playlistID, position, 'button', playlist.name);
      });
    });

    //set up event handelers to switch playlists when a click is recieved
    toolBarRef.attachEvent("onClick", function(id) {
      var playlistID = new Mongo.ObjectID(id);
      Session.set('openPlaylistID', playlistID);
    });
  });
};
