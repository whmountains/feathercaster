//load the 'agenda' npm module (required for the events)
var AgendaClass = Meteor.npmRequire('agenda');
var agenda = new AgendaClass({db: { address: '127.0.0.1:3001/meteor'}});

Meteor.methods({
  'eventsInsert': function(eventObj) {

      //parse the date (%Y-%m-%d %H:%i)
      // var eventDate = moment(eventObj.start_date, "D/M/YYYY H:m:s").toDate();

      //add the date to the agenda
      var job = agenda.schedule(eventObj.start_date, 'calendarEvent', eventObj);

      return job._id;
  },
  'eventsUpdate': function(eventObj) {

      //we have to wrap this query in a wrapper so that it runs non-async
      Async.runSync(function(done) {
        //delete the existing job
        // agenda.cancel({"_id": _(eventObj.id).id()}, function(err, numRemoved) {
        //   done();
        // });
        agenda.cancel({"_id": _(eventObj.id).id()}, function(err, numRemoved) {
          done();
        });
      });

      //re-create the job
      var job = agenda.schedule(eventObj.start_date, 'calendarEvent', eventObj);

      return job._id;
  },
  'eventsDelete': function(eventID) {
    //we have to wrap this query in a wrapper so that it runs non-async
    Async.runSync(function(done) {
      //delete the existing job
      agenda.cancel({"_id": _(eventID).id()}, function(err, numRemoved) {
        done();
      });
    });
  }
});

//127.0.0.1:3001/meteor
