var TodosCountView = Backbone.View.extend({

  tagName: 'p',
  template: [
    '<span class="b-todos-count">{{todosCount}} todos</span> left'
  ],

  initialize: function() {
    this.collection
        .bind('reset add destroy change:isDone', function() {
          this.render({ todosCount: this.collection.getUndoneTodosCount() });
        }, this);

    this.renderData = { todosCount: this.collection.getUndoneTodosCount() };
  }

});