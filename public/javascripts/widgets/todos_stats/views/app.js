/*global define, sandbox */

define(['sandbox', 'text!../templates/base.html'], function(sandbox, baseTemplate) {

  var AppView = sandbox.mvc.View({

    tagName: 'p',
    template: sandbox.template.parse(baseTemplate),

    initialize: function() {
      sandbox.subscribe('todos-created', 'todo_form', function(todosCollection) {
        this.collection = todosCollection;
        this.render({ todosCount: this.collection.getUndoneTodosCount() });

        this.collection
          .bind('reset add destroy change:isDone', function() {
            this.render({ todosCount: this.collection.getUndoneTodosCount() });
          }, this);
      }, this);
    }

  });

  return AppView;

});