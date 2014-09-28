eventsCollection = new Meteor.Collection('events');

Meteor.methods({
        'eventsInsert': function(eventObj) {
            var event_id = eventsCollection.insert(eventObj);
            return event_id;
        },
        'eventsUpdate': function(eventObj) {
            var event_id = eventsCollection.update(eventObj._id, eventObj);
            return event_id;
        },
        'eventsDelete': function(eventID) {
            var event_id = eventsCollection.remove(eventID);
            return event_id;
        }
});
