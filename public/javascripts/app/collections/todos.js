/*global
  TodoModel
*/
var TodosCollection = Backbone.Collection.extend({

  model: TodoModel,
  localStorage: new Store('todos-backbone'),

  getUndoneTodosCount: function() {
    return this.where({ isDone: false }).length;
  }

});