initFileTree = function(paneRef) {

  //init the tree
  var fileTreeRef = paneRef.attachTree();

  //set some options
  fileTreeRef.setImagesPath("dhxtree_skyblue/");

  //subscribe to the db
  Meteor.subscribe("files", function() {

    // set up a reactive computation that updates the scheduler
    Tracker.autorun(function(){
      // not using this right now
    });

    // Get the list of events from the db
    var files = filesCollection.find().fetch();

    // translate the data and add it to the tree if it exists
    if (files !== []) {
      //translate the array to the format that dhtmlxTree recognizes
      var output = [];
      _.each(files, function(element, i) {

        // translate the _id
        var idString = element._id.valueOf();

        //translate the parent id
        var parentId;
        if (element.parent !== undefined) {
          parentId = element.parent.valueOf();
        }
        else{
          parentId = 0;
        }
        output[i] = [idString, parentId, element.filename];
      });

      //send the new array to the tree
      fileTreeRef.loadJSArray(output);
    }
  });

  //setup events to do save things back to the db
  //not needed right now since we're not making the tree editable
  // scheduler.attachEvent("onEventAdded", function(id,ev){
  //   Meteor.call("insert", ev, function(error, event_id) {
  //   });
  // });
  // scheduler.attachEvent("onEventChanged", function(id,ev){
  //   Meteor.call("update", ev, function(error, event_id) {
  //   });
  // });
  // scheduler.attachEvent("onEventDeleted", function(id){
  //   Meteor.call("delete", id, function(error, event_id) {
  //   });
  // });
};
