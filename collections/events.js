eventsCollection = new Meteor.Collection('events');

Meteor.methods({
        'eventsInsert': function(ev) {
            var event_id = Meteor.eventsCollection.insert(ev);
            return event_id;
        },
        'eventsUpdate': function(ev) {
            var event_id = Meteor.eventsCollection.update(ev.id, ev);
            return event_id;
        },
        'eventsDelete': function(id) {
            var event_id = Meteor.eventsCollection.remove(id);
            return event_id;
        }
});
