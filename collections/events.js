eventsCollection = new Meteor.Collection('events');

Meteor.methods({
        'insert': function(ev) {
            var event_id = Meteor.events.insert(ev);
            return event_id;
        },
        'update': function(ev) {
            var event_id = Meteor.events.update(ev.id, ev);
            return event_id;
        },
        'delete': function(id) {
            var event_id = Meteor.events.remove(id);
            return event_id;
        }
});
