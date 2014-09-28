initFileTree = function(paneRef) {

  //init the tree
  fileTreeRef = paneRef.attachTree();

  //set some options
  fileTreeRef.setImagesPath("dhxtree_skyblue/");
  fileTreeRef.enableMultiselection(true,true);

  //subscribe to the db
  Meteor.subscribe("files", function() {

    // set up a reactive computation that updates the scheduler
    Tracker.autorun(function(){

      // create a cursor pointing to the list of files
      var filesCursor = filesCollection.find();

      // translate the data and add it to the tree if it exists
      if (filesCursor.count() !== 0) {

        //turn the cursor into an array
        var files = filesCursor.fetch();

        //translate the array to the format that dhtmlxTree recognizes
        var output = _.map(files, function(element, i) {
          //translate the parent id
          /* jshint -W041 */
          if (element.parent == undefined) { //purposeful loose comparison
          /* jshint +W041 */
            element.parent = 0;
          }
          return [element._id, element.parent, element.filename];
        });

        //clear existing data and send the new array to the tree
        fileTreeRef.deleteChildItems(0);
        fileTreeRef.loadJSArray(output);
      }
    });
  });
};
