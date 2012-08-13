/*global
  TodoView
*/
var TodosView = Backbone.View.extend({

  tagName: 'ul',
  className: 'b-todos-list',

  initialize: function() {
    this.collection
        .bind('reset', this.addAll, this)
        .bind('add', this.addOne, this);
  },

  addAll: function() {
    this.collection.each(this.addOne, this);
  },

  addOne: function(todo) {
    var todoView = new TodoView({ model: todo });

    this.$el.append(todoView.render().el);
  }

});