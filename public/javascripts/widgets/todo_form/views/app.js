/*global define, sandbox */

define(['sandbox', 'text!../templates/base.html'], function(sandbox, baseTemplate) {

  var AppView = sandbox.mvc.View({
    tagName: 'form',
    className: 'b-create-todo-form',
    template: sandbox.template.parse(baseTemplate),

    events: {
      'submit': 'createTodo'
    },

    initialize: function() {
      sandbox.subscribe('todos-created', 'todo_form', function(todosCollection) {
        this.collection = todosCollection;
      }, this);
    },

    createTodo: function(event) {
      event.preventDefault();

      this.collection && this.collection.create({ text: this.$('input[type="text"]').val() });
      this.$('input').val('');
    }
  });

  return AppView;

});