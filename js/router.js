$(window).ready(function() {
   App.Router = Backbone.Router.extend({
      routes: {
         "/":"",
         "start": "start"
      },

      start: function() {
         var person = new App.Person({id: _.random([0,7])});
         person.fetch({
            success: function(){
               var personView = new App.PersonView({model: person});
               var html = personView.render().el;
               $("#content").html(html);
            },
            error: App.error
         })

      }
   });

   App.router = new App.Router();

   Backbone.history.start();

});