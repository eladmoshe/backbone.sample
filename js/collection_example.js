$(window).ready(function() {
   App.People = Backbone.Collection.extend({
      model: App.Person,

      url: function(){
         return "/students"
      }
   });

   App.people = new App.People();
   App.people.fetch({
      success:function(collection, response, options){
         console.log("collection:",collection.toJSON());
      },
      error: App.error
   })




});