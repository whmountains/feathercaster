initPlaylistToolbar = function(paneRef) {

  //list the id's for each toolbar element
  ptbIDs = {
    'plistChoose': 'plistChoose',
    'plistOpt': 'plistSettings',
    'plistNew': 'plistNew',
    'plistDel': 'plistDel',
    'plistRen': 'plistRename',
    'plistAddA': 'plistAddAfter'
  };
  ptbPREs = {
    'plistChoose': 'PLIST'
  };

  // create a blank toolbar
  toolBarRef = paneRef.attachToolbar();

  // tell it where to find it's icons
  toolBarRef.setIconsPath("/dhx_skins/skyblue/imgs/dhxtoolbar_skyblue");

  //add the add selected button to the toolbar
  toolBarRef.addButton(
    ptbIDs.plistAddA, 0, '<i class="fa fa-plus"></i><i class="fa fa-music"></i>'
  );

  //add the new playlist button to the toolbar
  toolBarRef.addButtonSelect(
    ptbIDs.Opt, 1, '<i class="fa fa-cog"></i>',
    [
      [ptbIDs.plistNew,'obj','<i class="fa fa-bars"></i> <i class="fa fa-plus-square-o"></i> Add Playlist',''],
      [ptbIDs.plistDel,'obj','<i class="fa fa-bars"></i> <i class="fa fa-minus-square-o"></i> Delete Playlist','']
    ],
    null, null, 'disabled', true
  );

  //add the playlist chooser to the toolbar
  toolBarRef.addButtonSelect(
    ptbIDs.plistChoose, 2, 'Switch', [], null, null, 'disabled', true
  );

  //subscribe to the playlists collection
  Meteor.subscribe('playlists', function() {

    //clear the elements from the dropdown list and replace them with the
    //new list of playlists everytime that list changes
    Tracker.autorun(function(){

      //get the current list options
      var originalOptions = toolBarRef.getAllListOptions(ptbIDs.plistChoose);
      // remove each one of them (I don't know a way to do it all at once)
      _.each(originalOptions, function(optionIDstring){

        toolBarRef.removeListOption(ptbIDs.plistChoose, optionIDstring);
      });

      // get the list of playlists from the db
      var playlistsList = playlistsCollection.find({}, {name: 1}).fetch();

      // add each one as an option in the playlist chooser
      _.each(playlistsList, function(playlist, position){
        // the id of the list item is the playlist id prefixed by 'PLIST'
        var listItemID = ptbPREs.plistChoose + playlist._id;
        //add the playlist to the list
        toolBarRef.addListOption(ptbIDs.plistChoose, listItemID, position, 'button', playlist.name);
      });
    });

    //set up an event handeler to handle button clicks
    toolBarRef.attachEvent("onClick", function(id) {

      if (id.substr(0,5) === ptbPREs.plistChoose) { // select a playlist button
        // convert the id
        var playlistID = id.substr(5);
        Session.set('openPlaylistID', playlistID);
      }
      else if (id === ptbIDs.plistNew){ //new playlist button
        //promt for a name for the new playlist
        var playlistName = window.prompt('Enter a name for the new playlist');
        //make sure the user actually entered a name
        if (playlistName !== null) {
          //add the new playlist to the db
          var newPlaylistID = playlistsCollection.insert({'name': playlistName,'items': []});
          //change the current playlist the the just added playlist
          Session.set('openPlaylistID', newPlaylistID);
        }
      }
      else if (id === ptbIDs.plistDel) {

        // ask the user to confirm
        window.confirm('Delete current playlist?');

        // remove the playlist from the database
        playlistsCollection.remove({'_id': Session.get('openPlaylistID')});

        // reset the session variable
        Session.set('openPlaylistID', null);
      }
      else if (id === ptbIDs.plistAddA) {

        // get the current playlist
        var currPlistID = Session.get('openPlaylistID');

        // get the currently selected item(s) in the tree and in the grid
        var selectedItems = fileTreeRef.getSelectedItemId().split(',');
        //var insertPos = gridRef.getSelectedRowId().split(',')[0];

        _.each(selectedItems, function(itemID){
          //translate the itemID
          var item = {'fileID': itemID};

          // insert it into the playlist
          // i.e. push `item` into the items array
          playlistsCollection.update({'_id': currPlistID}, {
            $push: {'items': item}
          });
        });

        // //reformat the list of currently selected items in the tree
        // var insertArray = _.map(selectedItems, function(item){
        //   return {fileID: item};
        // });
        // playlistsCollection.update({'_id': currPlistID}, {
        //   $push: {'items': { $each: insertArray, $position: insertPos}}
        // });
      }
    });
  });
};
