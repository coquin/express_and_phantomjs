/*global define, sandbox */

define(['sandbox', '../models/todo'], function(sandbox, Todo) {

  var TodosCollection = sandbox.mvc.Collection({

    model: Todo,
    localStorage: new sandbox.data.Store('todos-backbone-require'),

    getUndoneTodosCount: function() {
      return this.where({ isDone: false }).length;
    }

  });

  return new TodosCollection();

});