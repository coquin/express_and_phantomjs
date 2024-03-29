/*global define, sandbox */

define(['sandbox', 'text!../templates/todoTemplate.html'], function(sandbox, todoTemplate) {

  var TodoView = sandbox.mvc.View({

    tagName: 'li',
    template: sandbox.template.parse(todoTemplate),
    attributes: function() {
      var className = 'b-todos-list-item';

      if (this.model.get('isDone')) {
        className += ' ' + className + '--done';
      }

      return { 'class': className };
    },

    events: {
      'click input[type="checkbox"]': 'toggleDone',
      'click .b-remove-icon': 'removeTodo'
    },

    initialize: function() {
      this.model
          .bind('change:isDone', function(model, isDone) {
            this.$el.toggleClass('b-todos-list-item--done', isDone);
            this.$('input[type="checkbox"]').attr('checked', isDone);
          }, this)
          .bind('destroy remove', this.remove, this);
    },

    toggleDone: function() {
      this.model
          .toggleDone()
          .save();
    },

    removeTodo: function() {
      this.model.destroy();
    },

    // Переопределим стандартный метод `remove` для выполнения
    // дополнительных действий по очистке за собой
    remove: function() {
      this.model.off();
      this.$el
          .off()
          .remove();
    }

  });

  return TodoView;

});