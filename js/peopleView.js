$(window).ready(function() {
   App.PersonView = Backbone.View.extend({

      tagName: "li",

      events: {
         "click .btn": "onShowClick"
      },

      template: _.template(
         '<div style="color: <%=this.model.get("favorite_color")%>";>' +
            'Name : <%= this.model.get("name")%></div>' +

            '<select name="colors">' +
            '<option value="red">red</option>' +
            '<option value="yellow">yellow</option>' +
            '<option value="green">green</option>' +
            '<option value="blue">blue</option>' +
            '</select>' +

            '<input type="button" class="btn" value="Update"/>'),

      initialize: function() {
         this.listenTo(this.model, "change", this.render)
      },

      render: function() {
         this.$el.html(this.template(this.model.get("name")));
         this.$el.find("select")[0].value = this.model.get("favorite_color");
         return this;
      },

      onShowClick: function() {
         this.model.update({favorite_color: this.$el.find("select")[0].value});
      }



   });
});
