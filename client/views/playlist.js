// initPlaylistGrid = function(paneRef) {
//
//   //attach a grid to the pane
//   var gridRef = paneRef.attachGrid();
//
//   //tell the grid what colum headers to use
//   gridRef.setHeader("Name, Length, Total Time");
//
//   //tell the grid array indexes that correspond to the colum heders
//   gridRef.setColumnIds("name", "playTime", "totalTime");
//
//   //only continue after we subscribe to the collection
//   Meteor.subscribe('playlists', function() {
//
//     //load data into the grid now and everytime
//     //the openPlaylistID session variable changes,
//     //or the actual playlist content changes
//     //ideally this should be done in a way that doesn't block the ui
//     Tracker.autorun(function() {
//
//       var openPlaylistID = Session.get('openPlaylistID');
//
//       //update the UI if there is indeed an open playlist
//       if (openPlaylistID !== null) {
//
//         //Get the playlist from the db
//         var openPlaylist = playlistsCollection.findOne({'_id': openPlaylistID});
//
//         //Set the title of the pane
//         paneRef.setText(openPlaylist.name);
//
//         //create a data object in the format that dhtmlxGrid wants
//         var data      = {'pos': 0};
//         var totalTime = 0; //total time in seconds
//
//         data.data = _.map(openPlaylist.items, function(playlistItem) {
//
//           //init the row
//           var row = {};
//
//           //get the info for file that this playlist item points to
//           file = filesCollection.findOne({'_id': playlistItem.fileID});
//
//           //increment the total time
//           totalTime = totalTime + file.playTime;
//
//           //translate the values we want
//           row.name = file.fileName;
//           row.playTime = file.playTime;
//           row.totalTime = file.totalTime;
//         });
//
//         //send the data to the grid
//         gridRef.load(data, 'js');
//       }
//     });
//   });
// };
