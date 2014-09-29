initScheduler = function(paneRef) {
  scheduler.config.xml_date="%d/%m/%Y %H:%i:%s";
  scheduler.config.prevent_cache = true;
  var schedulerRef = paneRef.attachScheduler(null, 'day');

  //subscribe to the db
  Meteor.subscribe("events", function() {
    // set up a computation that updates the scheduler
    Tracker.autorun(function(){

      // Get the list of events from the db
      var events = eventsCollection.find().fetch();

      //translate the events from the db to scheduler language
      var eventsSch = _.map(events, function(doc, index){
        //blank result object
        var event = {};

        //map simple fields
        event.id = doc._id.valueOf();
        event.text = doc.data.text;

        //map start_date
        var time = moment(doc.nextRunAt);
        event.start_date = time.format("DD/MM/YYYY H:m:s");

        //map end_date (just a shim for right now)
        time.add(1, 'hours');
        event.end_date = time.format("DD/MM/YYYY H:m:s");

        //return
        return event;
      });

      //clear the scheduler and parse the new data
      scheduler.clearAll();
      scheduler.parse(eventsSch, 'json');
    });
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
  scheduler.attachEvent("onEventDeleted", function(eventID, eventObj){
    Meteor.call("eventsDelete", eventID, function(error, eventID) {
    });
  });
};
