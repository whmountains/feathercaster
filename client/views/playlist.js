initPlaylistGrid = function(paneRef) {

  //attach a grid to the pane
  gridRef = paneRef.attachGrid();
  //tell the grid what colum headers to use
  gridRef.setHeader("Name, Length, Total Time");
  //tell the grid array indexes that correspond to the colum heders
  gridRef.setColumnIds("name", "playTime", "totalTime");
  //tell the grid where it's images are located
  gridRef.setImagePath("dhx_skins/skyblue/imgs/dhxgrid_skyblue");
  //tell the grid to allow multiselect
  gridRef.enableMultiselect(true);
  //tell the grid that we're done preconfiguring it
  gridRef.init();

  //only continue after we subscribe to the collection
  Meteor.subscribe('playlists', function() {

    //load data into the grid now and everytime
    //the openPlaylistID session variable changes,
    //or the actual playlist content changes
    //ideally this should be done in a way that doesn't block the ui
    Tracker.autorun(function() {

      //get the open playlist session variable
      var openPlaylistID = Session.get('openPlaylistID');

      //is there a playlist selected, or do we need to just clear the ui
      if (openPlaylistID === null) {
        //reset the playlist selector dropdown
        toolBarRef.setItemText(ptbIDs.plistChoose, 'Choose Playlist');
        //clear the existing data from the grid
        gridRef.clearAll();
      }
      else {
        //Get the playlist from the db
        var openPlaylist = playlistsCollection.findOne({'_id': openPlaylistID});

        //Set the title of the the playlist selector dropdowm
        toolBarRef.setItemText(ptbIDs.plistChoose, openPlaylist.name);

        //create a data object in the format that dhtmlxGrid wants
        var data      = {'pos': 0};
        var totalTime = 0; //total time in seconds

        data.data = _.map(openPlaylist.items, function(playlistItem) {

          //init the row
          var row = {};

          //get the info for file that this playlist item points to
          file = filesCollection.findOne({'_id': playlistItem.fileID});

          //increment the total time
          totalTime = totalTime + file.playTime;

          //translate the values we want
          row.name = file.filename;
          row.playTime = file.playTime;
          row.totalTime = file.totalTime;

          //return `row` which will become an element in the `data.data` array
          return row;
        });

        //clear the existing data from the grid
        gridRef.clearAll();

        //send the data to the grid
        gridRef.parse(data, 'js');
      }
    });
  });
};
