initScheduler = function(paneRef) {
  scheduler.config.xml_date="%Y-%m-%d %H:%i";
  scheduler.config.prevent_cache = true;
  var schedulerRef = paneRef.attachScheduler(null, 'day');

  //subscribe to the db
  Meteor.subscribe("events");

  // set up a computation that updates the scheduler
  Tracker.autorun(function(){
    // Get the list of events from the db
    var events = eventsCollection.find().fetch();

    //translate the element.id
    _.each(events, function(element) {
      element.id = element._id;
    });
    scheduler.clearAll();
    scheduler.parse(events, 'json');
  });

  //setup events to do save things back to the db
  scheduler.attachEvent("onEventAdded", function(id,ev){
    Meteor.call("insert", ev, function(error, event_id) {
    });
  });
  scheduler.attachEvent("onEventChanged", function(id,ev){
    Meteor.call("update", ev, function(error, event_id) {
    });
  });
  scheduler.attachEvent("onEventDeleted", function(id){
    Meteor.call("delete", id, function(error, event_id) {
    });
  });
};
