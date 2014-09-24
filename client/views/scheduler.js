var  initScheduler = function () {

            $("#scheduler").dhx_scheduler({
                xml_date:"%Y-%m-%d %H:%i",
                prevent_cache:true,
                date:new Date(),
                mode:"week",
                hour_size_px: 100
            });

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
Template.scheduler.rendered = function(){

    //load the scheduler
    initScheduler();

    Meteor.subscribe("events");
    Meteor.autorun(function(){
        var evs = Meteor.events.find().fetch();
        var load = [];
        $.each( evs, function(i, e){
        load[i] = {id:e._id,start_date:e.start_date,end_date:e.end_date,text:e.text} ;
        });
        scheduler.clearAll();
        scheduler.parse(load, 'json');
    });

};
