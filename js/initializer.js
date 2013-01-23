$(window).ready(function(){
   App = {};
   App.error = function(model, xhr, options) {
      console.log("Error", xhr.error);
   }
});