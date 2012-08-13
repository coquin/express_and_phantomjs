var TodosCountView = Backbone.View.extend({

  tagName: 'p',
  template: [
    '<span class="b-todos-count">{{#count todosCount singular="todo" plural="todos" none="No"}}{{/count}}</span> left'
  ],

  initialize: function() {
    this.collection
        .bind('reset add destroy change:isDone', function() {
          this.render({ todosCount: this.collection.getUndoneTodosCount() });
        }, this);
  }

});