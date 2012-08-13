var TodoModel = Backbone.Model.extend({

  defaults: {
    isDone: false,
    text: ''
  },

  validate: function(attrs) {
    if (!attrs.text) {
      return 'Todo must have text';
    }
  },

  toggleDone: function() {
    this.set('isDone', !this.get('isDone'));

    return this;
  }

});