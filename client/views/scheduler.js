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
    
    scheduler.clearAll();
    scheduler.parse(events, 'json');
  });

  //setup events to do save things back to the db
  scheduler.attachEvent("onEventAdded", function(eventID, eventObj){
    Meteor.call("eventsInsert", eventObj, function(error, eventID) {
    });
  });
  scheduler.attachEvent("onEventChanged", function(eventID,eventObj){
    Meteor.call("eventsUpdate", eventObj, function(error, eventID) {
    });
  });
  scheduler.attachEvent("onEventDeleted", function(eventID){
    Meteor.call("eventsDelete", eventID, function(error, eventID) {
    });
  });
};
