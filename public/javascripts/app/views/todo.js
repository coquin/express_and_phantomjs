var TodoView = Backbone.View.extend({

  tagName: 'li',
  attributes: function() {
    var className = 'b-todos-list-item';

    if (this.model.get('isDone')) {
      className += ' ' + className + '--done';
    }

    return { 'class': className };
  },

  template: [
    '<input type="checkbox"{{#if isDone}} checked="checked"{{/if}} />',
    '<span class="b-todos-list-item-text{{#if isDone}} b-todos-list-item-text--done{{/if}}">{{text}}</span>',
    '<i class="b-remove-icon"></i>'
  ],

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

  // Override default `remove` method to perform clean up
  // before actual element remove
  remove: function() {
    this.model.off();
    this.$el
        .off()
        .remove();
  }

});