/*global
  TodoModel
*/
var TodoFormView = Backbone.View.extend({

  tagName: 'form',
  className: 'b-create-todo-form',
  template: [
    '<span class="b-text-input">',
      '<input type="text" name="todo" placeholder="What needs to be done?" />',
    '</span>',
    '<button style="display: none;"></button>' // To auto-submit form on Enter
  ],

  events: {
    'submit': 'createTodo'
  },

  createTodo: function(event) {
    event.preventDefault();

    this.collection.create({ text: this.$('input[type="text"]').val() });
    this.$('input').val('');
  }

});