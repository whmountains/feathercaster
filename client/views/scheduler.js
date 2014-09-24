// var timeDatepickerPrecise = {
//   render: function(sns) {
//     // sns - section configuration object
//     return 'test';
//   },
//   set_value: function(node, value, ev) {
//     //node - html object related to html defined above
//     //value - value defined by map_to property
//     //ev - event object
//   },
//   get_value: function(node, ev) {
//     //node - html object related to html defined above
//     //event object
//   },
//   focus: function(node) {
//     //node - html object related to html defined above
//   }
// };

var  initScheduler = function () {

            $("#scheduler").dhx_scheduler({
                xml_date:"%Y-%m-%d %H:%i",
                prevent_cache:true,
                date:new Date(),
                mode:"week",
                hour_size_px: 100,
                time_step: 0.1,
                lightbox: {
                  sections: [
                    {
                      "name":"description",
                      "height":200,
                      "map_to":"text",
                      "type":"textarea",
                      "focus":true
                    },
                    {
                      "name":"time",
                      "height":72,
                      "type":"time",
                      "map_to":"auto"
                    }
                  ]
                }
            });

            scheduler.attachEvent("onEventAdded", function(id,ev){
                Meteor.call("insert", ev, function(error, event_id) {
                });
                console.log('test');
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
Template.scheduler.rendered = function(){

    //load the scheduler
    initScheduler();

    Meteor.subscribe("events");
    Meteor.autorun(function(){

        // Get the list of events from the db
        var events = Meteor.events.find().fetch();

        _.each(events, function(element) {
          element.id = element._id;
        });
        scheduler.clearAll();
        scheduler.parse(events, 'json');
    });

};
