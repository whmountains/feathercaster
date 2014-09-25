eventsCollection = new Meteor.Collection('events');

Meteor.methods({
        'insert': function(ev) {
            var event_id = Meteor.eventsCollection.insert(ev);
            return event_id;
        },
        'update': function(ev) {
            var event_id = Meteor.eventsCollection.update(ev.id, ev);
            return event_id;
        },
        'delete': function(id) {
            var event_id = Meteor.eventsCollection.remove(id);
            return event_id;
        }
});
