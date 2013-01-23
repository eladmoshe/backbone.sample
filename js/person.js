$(window).ready(function() {

   App.Person = Backbone.Model.extend({
      defaults: {
         id: undefined,
         name: undefined,
         age: undefined,
         favorite_color: undefined
      },

      initialize: function(options) {
         //some initialization here...
      },

      urlRoot: function() {
         return "/students/";
      },

      update:function(options){
         var that = this;
         _(options).each(function(value, key){
            that.set(key, value);
         });
         this.save();
      }
   });

   //create empty person placeholder
   var person = new App.Person({id: 1});

   //get the person info from the server
   person.fetch({
      success: function(model, response, options) {
         //print the current person favourite color
         console.log(model.get("name"), ":", model.get("favorite_color"));

         //set the favourite color to black, we could do it in the "save" parameters as well on next line
         person.set("favorite_color", "grey");

         //save to the server
         person.save({}, {
            success: function(model, response, options) {
               //print the new favourite color from the server
               console.log(person.get("name"), ":", person.get("favorite_color"));
            },
            error: App.error
         });
      },
      error: App.error
   });

   //create a new model
   var another = new App.Person();
   another.save(
      {
         name: "Thomas",
         age: 36,
         favorite_color: "orange"
      },
      {
         success: function(model, response, options) {
            console.log(model.attributes);
         },
         error: App.error
      })

});