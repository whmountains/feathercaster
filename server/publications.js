Meteor.publish("events", function () {

    return Meteor.events.find({});

});
