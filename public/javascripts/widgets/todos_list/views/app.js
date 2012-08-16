/*global define, sandbox */

define(['sandbox', './todo', '../collections/todos'], function(sandbox, TodoView, TodosCollection) {

  var AppView = sandbox.mvc.View({

    tagName: 'ul',
    className: 'b-todos-list',

    initialize: function() {
      this.collection = TodosCollection;

      sandbox.publish('todos-created', this.collection);

      this.collection
          .bind('reset', this.addAll, this)
          .bind('add', this.addOne, this);

      this.collection.fetch({
        success: function(collection) {
          if (!collection.length) {
            collection.reset(window.todosBootstrap);
          }
        }
      });
    },

    addAll: function() {
      this.collection.each(this.addOne, this);
    },

    addOne: function(todo) {
      var todoView = new TodoView({ model: todo });

      this.$el.append(todoView.render().el);
    }

  });

  return AppView;

});